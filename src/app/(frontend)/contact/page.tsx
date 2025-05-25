'use client'

import ContactForm from '@/components/ContactForm'

// Sample contact form data - in production this would come from your CMS
const contactFormData = {
  id: 'contact-us',
  title: 'Contact Us',
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your full name'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter your email address'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      required: true,
      placeholder: 'What is this regarding?'
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      placeholder: 'Tell us how we can help you...'
    }
  ]
}

export default function ContactPage() {

  return (
    <div className="contact-page">
      <div className="container">
        <div className="hero-section">          <h1>Get In Touch</h1>
          <p>We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
        </div>
        
        <div className="form-section">
          <ContactForm 
            formId={contactFormData.id}
            fields={contactFormData.fields}
            title={contactFormData.title}
          />
        </div>

        <div className="info-section">
          <div className="contact-info">
            <h3>Other Ways to Reach Us</h3>
            <div className="contact-methods">
              <div className="contact-method">
                <h4>Email</h4>
                <p>hello@weframetech.com</p>
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
