'use client'
import { useState } from 'react'
import type { FormField } from '@/types/form'

interface ContactFormProps {
  formId: string
  fields: FormField[]
  title: string
}

export default function ContactForm({ formId, fields, title }: ContactFormProps) {
  // Add debug logging
  console.log('ContactForm props:', { formId, fields, title })
  console.log('Fields array:', fields)
  console.log('Fields length:', fields?.length)

  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Validate required fields
    const missingFields = fields
      .filter((field) => field.required && !formData[field.name]?.trim())
      .map((field) => field.label)

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in required fields: ${missingFields.join(', ')}`)
      setIsSubmitting(false)
      return
    }

    try {
      // Convert formData object to array format for submission
      const submissionDataArray = Object.entries(formData).map(([field, value]) => ({
        field,
        value,
      }))

      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          submissionData: submissionDataArray, // Send data in array format
        }),
      })

      const result = await response.json()
      console.log('Submission result:', result)

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({}) // Reset form
      } else {
        console.error('Submission failed:', result)
        setSubmitStatus('error')
        setErrorMessage(result.details || result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
      required: field.required,
      value: formData[field.name] || '',
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
      ) => handleInputChange(field.name, e.target.value),
    }

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} className="form-input" />
      case 'select':
        return (
          <select {...commonProps} className="form-input">
            <option value="">Select {field.label}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'email':
        return <input {...commonProps} type="email" className="form-input" />
      case 'text':
      default:
        return <input {...commonProps} type="text" className="form-input" />
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h3>Thank you!</h3>
        <p>Your message has been sent successfully. We'll get back to you soon.</p>
        <button onClick={() => setSubmitStatus('idle')} className="reset-button">
          Send Another Message
        </button>

        <style jsx>{`
          .success-container {
            text-align: center;
            padding: 3rem 2rem;
          }

          .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }

          h3 {
            color: #10b981;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          p {
            color: #6b7280;
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          .reset-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: opacity 0.2s;
          }

          .reset-button:hover {
            opacity: 0.9;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        {fields && fields.length > 0 ? (
          fields.map((field, index) => {
            console.log('Rendering field:', field) // Debug each field
            return (
              <div key={field.name || index} className="form-field">
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                  {field.required && <span className="required">*</span>}
                </label>
                {renderField(field)}
              </div>
            )
          })
        ) : (
          <div style={{ background: '#ffcccc', padding: '1rem', borderRadius: '4px' }}>
            <strong>No fields found!</strong>
            <br />
            Fields prop: {JSON.stringify(fields)}
            <br />
            Check if the API is returning the correct form structure.
          </div>
        )}

        {(submitStatus === 'error' || errorMessage) && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <p>{errorMessage || 'There was an error submitting your form. Please try again.'}</p>
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-title {
          text-align: center;
          color: #1f2937;
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
          font-size: 0.9rem;
        }

        .required {
          color: #ef4444;
          margin-left: 2px;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input:hover {
          border-color: #d1d5db;
        }

        textarea.form-input {
          resize: vertical;
          min-height: 100px;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #dc2626;
        }

        .error-icon {
          font-size: 1.1rem;
        }

        .error-message p {
          margin: 0;
          font-size: 0.9rem;
        }

        .submit-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 50px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 0 1rem;
          }

          .form-title {
            font-size: 1.5rem;
          }

          .form-input {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  )
}
