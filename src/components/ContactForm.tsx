'use client'
import { useState } from 'react'

interface ContactFormProps {
  formId: string
  fields: any[]
  title: string
}

export default function ContactForm({ formId, fields, title }: ContactFormProps) {
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      console.log('Submitting form:', { formId, submissionData: formData }) // DEBUG

      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          submissionData: formData,
        }),
      })

      const result = await response.json()
      console.log('Submission result:', result) // DEBUG

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({}) // Reset form
      } else {
        console.error('Submission failed:', result)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  if (submitStatus === 'success') {
    return (
      <div className="success-message">
        <h3>Thank you!</h3>
        <p>Your message has been sent successfully. We'll get back to you soon.</p>
        <button onClick={() => setSubmitStatus('idle')}>Send Another Message</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      
      {fields.map((field) => (
        <div key={field.name} className="form-field">
          <label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              rows={4}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      {submitStatus === 'error' && (
        <div className="error-message">
          <p>There was an error submitting your form. Please try again.</p>
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <style jsx>{`
        .form-field {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }

        .required {
          color: #e53e3e;
          margin-left: 2px;
        }

        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message, .error-message {
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .success-message {
          background: #f0fff4;
          border: 1px solid #68d391;
          color: #2d7d32;
        }

        .error-message {
          background: #fed7d7;
          border: 1px solid #fc8181;
          color: #c53030;
        }
      `}</style>
    </form>
  )
}
