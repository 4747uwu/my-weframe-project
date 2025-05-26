'use client'
import { useState, useEffect } from 'react'
import ContactForm from '@/components/ContactForm'
import type { Form, FormsResponse } from '@/types/form'

export default function ContactPage() {
  const [form, setForm] = useState<Form | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fallback form fields
  const fallbackForm: Form = {
    id: 'fallback',
    title: 'Contact Us',
    fields: [
      {
        id: '1',
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        id: '2',
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'Enter your email address'
      },
      {
        id: '3',
        name: 'subject',
        label: 'Subject',
        type: 'text',
        required: true,
        placeholder: 'What is this regarding?'
      },
      {
        id: '4',
        name: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
        placeholder: 'Tell us how we can help you...'
      }
    ]
  }

  useEffect(() => {
    fetch('/api/forms?tenant=weframetech-demo')
      .then(res => res.json())
      .then((data: any) => {
        console.log('🔍 API Response:', data)
        
        if (data.forms && Array.isArray(data.forms) && data.forms.length > 0) {
          const contactForm = data.forms[0]
          console.log('🔍 Using form from API:', contactForm)
          
          if (contactForm && contactForm.id && contactForm.title) {
            setForm({
              id: contactForm.id,
              title: contactForm.title,
              fields: contactForm.fields && contactForm.fields.length > 0 
                ? contactForm.fields 
                : fallbackForm.fields // Use fallback if no fields
            })
          } else {
            console.log('🔍 Invalid form data, using fallback')
            setForm(fallbackForm)
          }
        } else {
          console.log('🔍 No forms from API, using fallback')
          setForm(fallbackForm)
        }
      })
      .catch(err => {
        console.error('🔍 API Error, using fallback:', err)
        setForm(fallbackForm) // Use fallback on error
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="hero-section">
            <h1>Loading...</h1>
            <p>Please wait while we load the contact form.</p>
          </div>
        </div>
        <style jsx>{`
          .contact-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .hero-section {
            text-align: center;
            color: white;
          }
          .hero-section h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="hero-section">
            <h1>Error</h1>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
        <style jsx>{`
          .contact-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .hero-section {
            text-align: center;
            color: white;
          }
          button {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 1rem;
          }
        `}</style>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="hero-section">
            <h1>No Form Available</h1>
            <p>Contact form is not available at the moment.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="hero-section">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="form-section">
          <ContactForm 
            formId={form.id.toString()}
            fields={form.fields}
            title={form.title}
          />
        </div>

        <div className="info-section">
          <div className="contact-info">
            <h3>Other Ways to Reach Us</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <h4>Email</h4>
                <p>info@weframetech.com</p>
              </div>
              <div className="contact-method">
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-method">
                <h4>Address</h4>
                <p>123 Business Street<br />Suite 100<br />City, State 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 3rem;
          color: white;
        }

        .hero-section h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-section p {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-section {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 3rem;
        }

        .info-section {
          color: white;
          text-align: center;
        }

        .contact-info h3 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .contact-method {
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .contact-method h4 {
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .contact-method p {
          margin: 0;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem;
          }
          
          .form-section {
            padding: 1.5rem;
          }

          .contact-methods {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
