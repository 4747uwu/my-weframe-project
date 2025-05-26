import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const tenantSlug = searchParams.get('tenant')
    const formId = searchParams.get('id')

    if (formId) {
      // Get specific form
      const form = await payload.findByID({
        collection: 'forms',
        id: formId,
        depth: 2, // Include tenant information
      })
      return Response.json({ form })
    }

    if (tenantSlug) {
      // Get forms by tenant
      const forms = await payload.find({
        collection: 'forms',
        where: {
          'tenant.slug': { equals: tenantSlug }
        },
        depth: 2, // Include tenant information
      })
      return Response.json({ forms: forms.docs })
    }

    // Get all forms (for super admin)
    const forms = await payload.find({
      collection: 'forms',
      depth: 2,
    })
    
    return Response.json({ forms: forms.docs })
  } catch (error) {
    console.error('Error fetching forms:', error)
    return Response.json({ error: 'Failed to fetch forms' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { formId, submissionData } = await request.json()

    console.log('Received submission for form ID:', formId) // DEBUG

    // Verify form exists
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
    })

    console.log('Found form:', form) // DEBUG

    if (!form) {
      return Response.json({ error: 'Form not found' }, { status: 404 })
    }

    // Create form submission - tenant will be auto-assigned by the collection hook
    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        // Don't manually set tenant - let the hook handle it
        submissionData,
        submittedAt: new Date(),
      },
    })

    console.log('Created submission:', submission) // DEBUG

    return Response.json({ 
      success: true, 
      id: submission.id,
      message: 'Form submitted successfully' 
    })

  } catch (error) {
    console.error('Error creating form submission:', error)
    return Response.json({ 
      error: 'Failed to submit form',
      details: error.message 
    }, { status: 500 })
  }
}
