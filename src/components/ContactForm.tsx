'use client'

import { useState } from 'react'

interface FormField {
  name: string
  label: string
  type: string
  required: boolean
  placeholder?: string
  options?: { label: string; value: string }[]
}

interface ContactFormProps {
  formId: string
  fields: FormField[]
  title: string
}

export default function ContactForm({ formId, fields, title }: ContactFormProps) {  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
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

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setSubmitted(true)
      setMessage(result.message)
      
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }
  if (submitted) {
    return (
      <div className="contact-form-success">
        <h3>Thank You!</h3>
        <p>{message}</p>
        
        <style jsx>{`
          .contact-form-success {
            text-align: center;
            padding: 3rem 2rem;
            background: #f8f9fa;
            border-radius: 12px;
            border: 2px solid #28a745;
          }

          .contact-form-success h3 {
            color: #28a745;
            margin-bottom: 1rem;
            font-size: 1.5rem;
          }

          .contact-form-success p {
            color: #555;
            font-size: 1.1rem;
            margin: 0;
          }
        `}</style>
      </div>
    )
  }
  return (
    <div className="contact-form">
      <h2>{title}</h2>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
                required={field.required}
                placeholder={field.placeholder}
                value={
                  typeof formData[field.name] === 'boolean'
                    ? ''
                    : String(formData[field.name] || '')
                }
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                value={
                  typeof formData[field.name] === 'boolean'
                    ? ''
                    : String(formData[field.name] || '')
                }
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={Boolean(formData[field.name]) || false}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={
                  typeof formData[field.name] === 'boolean'
                    ? ''
                    : String(formData[field.name] || '')
                }
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <style jsx>{`
        .contact-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-form h2 {
          margin-bottom: 1.5rem;
          color: #333;
          font-size: 1.8rem;
          font-weight: 600;
          text-align: center;
        }

        .form-field {
          margin-bottom: 1.5rem;
        }

        .form-field label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #555;
        }

        .required {
          color: #e74c3c;
          margin-left: 2px;
        }

        .form-field input,
        .form-field textarea,
        .form-field select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          background: #fff;
          box-sizing: border-box;
        }

        .form-field input:focus,
        .form-field textarea:focus,
        .form-field select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-field textarea {
          min-height: 120px;
          resize: vertical;
        }

        .form-field input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }

        .contact-form button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .contact-form button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .contact-form button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .error-message p {
          margin: 0;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .contact-form {
            padding: 0 1rem;
          }
          
          .contact-form h2 {
            font-size: 1.5rem;
          }
          
          .form-field input,
          .form-field textarea,
          .form-field select {
            padding: 0.6rem;
          }
          
          .contact-form button {
            padding: 0.9rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
