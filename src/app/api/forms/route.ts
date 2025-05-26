import { getPayload } from 'payload'
import config from '@payload-config'

// Helper function to get client IP
function getClientIP(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  return '127.0.0.1'
}

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const tenantSlug = searchParams.get('tenant')
    const formId = searchParams.get('id')

    if (formId) {
      const form = await payload.findByID({
        collection: 'forms',
        id: formId,
        depth: 2,
      })
      return Response.json({ form })
    }

    if (tenantSlug) {
      const forms = await payload.find({
        collection: 'forms',
        where: {
          'tenant.slug': { equals: tenantSlug }
        },
        depth: 2,
      })
      return Response.json({ forms: forms.docs })
    }

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

    console.log('Received submission for form ID:', formId)

    // Verify form exists
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
    })

    console.log('Found form:', form)

    if (!form) {
      return Response.json({ error: 'Form not found' }, { status: 404 })
    }

    // Create form submission using Form Builder plugin's collection
    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData, // Form Builder expects the raw object, not formatted array
      },
    })

    console.log('Created submission:', submission)

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
