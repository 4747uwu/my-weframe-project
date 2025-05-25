import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { searchParams } = new URL(request.url)
    const tenantSlug = searchParams.get('tenant')
    const formId = searchParams.get('id')

    if (!tenantSlug && !formId) {
      return NextResponse.json(
        { error: 'Either tenant slug or form ID is required' },
        { status: 400 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereQuery: any = {}

    if (formId) {
      whereQuery.id = { equals: formId }
    } else if (tenantSlug) {
      // Find tenant first
      const tenants = await payload.find({
        collection: 'tenants',
        where: {
          slug: { equals: tenantSlug },
        },
        limit: 1,
      })

      if (tenants.docs.length === 0) {
        return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
      }

      whereQuery.tenant = { equals: tenants.docs[0].id }
    }

    const forms = await payload.find({
      collection: 'forms',
      where: whereQuery,
    })

    return NextResponse.json({ forms: forms.docs })
  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()
    const { formId, submissionData } = body

    if (!formId || !submissionData) {
      return NextResponse.json(
        { error: 'Form ID and submission data are required' },
        { status: 400 }
      )
    }

    // Verify form exists and is active
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
    })

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    // Get client IP and user agent
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create form submission
    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData,
        submitterIP: clientIP,
        submitterUserAgent: userAgent,
      },
      context: { payload }, // Pass payload in context for hooks
    })

    // Send confirmation emails if configured
    if (form.emails && form.emails.length > 0) {
      // Here you would implement email sending logic
      // For this demo, we'll just log it
      console.log('Would send emails to:', form.emails)
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: form.confirmationMessage || 'Thank you for your submission!',
      redirectUrl: form.confirmationType === 'redirect' ? form.redirect?.url : null,
    })
  } catch (error) {
    console.error('Error creating form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
