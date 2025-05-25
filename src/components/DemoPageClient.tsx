'use client'

import ContactForm from './ContactForm'

interface DemoFormField {
  name: string
  label: string
  type: string
  required: boolean
}

interface DemoPageClientProps {
  forms: Array<{
    id: string | number
    title: string
    fields: DemoFormField[]
  }>
  demoForm: {
    id: string | number
    title: string
    fields: DemoFormField[]
  } | null
}

export default function DemoPageClient({ forms, demoForm }: DemoPageClientProps) {
  // Default demo form if none available from database
  const defaultDemoForm = {
    id: 'demo-contact',
    title: 'Demo Contact Form',
    fields: [
      {
        name: 'name',
        label: 'Your Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'your.email@example.com'
      },
      {
        name: 'company',
        label: 'Company',
        type: 'text',
        required: false,
        placeholder: 'Your company name'
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        required: true,
        placeholder: 'Tell us about your project requirements...'
      }
    ]
  }
  const displayForm = demoForm || defaultDemoForm

  return (
    <div className="demo-page">
      <div className="container">
        <header className="demo-header">
          <h1>WeframeTech Form Builder Demo</h1>
          <p className="subtitle">
            Experience our powerful multi-tenant form builder in action
          </p>
        </header>

        <div className="demo-content">
          <div className="demo-grid">
            {/* Live Form Demo */}
            <section className="form-demo-section">
              <div className="section-header">
                <h2>🚀 Live Form Demo</h2>
                <p>Try our dynamic form builder - submit a real form!</p>
              </div>              <div className="form-container">
                <ContactForm 
                  formId={String(displayForm.id)}
                  fields={displayForm.fields.map(field => ({
                    ...field,
                    placeholder: `Enter your ${field.label.toLowerCase()}`
                  }))}
                  title={displayForm.title}
                />
              </div>
            </section>

            {/* Features Overview */}
            <section className="features-section">
              <div className="section-header">
                <h2>✨ Key Features</h2>
                <p>What makes our solution special</p>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🏢</div>
                  <h3>Multi-Tenant Architecture</h3>
                  <p>Complete tenant isolation with role-based access control</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🎨</div>
                  <h3>Dynamic Form Builder</h3>
                  <p>Create and customize forms through an intuitive admin interface</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🔒</div>
                  <h3>Secure Submissions</h3>
                  <p>All form data is securely stored with tenant-specific access</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3>Real-time Analytics</h3>
                  <p>Track form performance and submission analytics</p>
                </div>
              </div>
            </section>

            {/* API Overview */}
            <section className="api-section">
              <div className="section-header">
                <h2>🔌 API Endpoints</h2>
                <p>Ready-to-use REST APIs for your applications</p>
              </div>

              <div className="api-grid">
                <div className="api-card">
                  <div className="api-method get">GET</div>
                  <div className="api-info">
                    <h4>/api/forms</h4>
                    <p>Retrieve all available forms for current tenant</p>
                  </div>
                </div>
                
                <div className="api-card">
                  <div className="api-method post">POST</div>
                  <div className="api-info">
                    <h4>/api/forms</h4>
                    <p>Submit form data with automatic validation</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Database Status */}
            <section className="status-section">
              <div className="section-header">
                <h2>📋 Current Status</h2>
                <p>Live data from our Payload CMS</p>
              </div>

              <div className="status-grid">
                <div className="status-card">
                  <div className="status-number">{forms.length}</div>
                  <div className="status-label">Forms Available</div>
                </div>
                
                <div className="status-card">
                  <div className="status-number">✅</div>
                  <div className="status-label">Database Connected</div>
                </div>
                
                <div className="status-card">
                  <div className="status-number">🔄</div>
                  <div className="status-label">Real-time Sync</div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="demo-footer">
          <p>Built with ❤️ for WeframeTech using Payload CMS, Next.js 15, and PostgreSQL</p>
          <div className="tech-stack">
            <span className="tech-tag">Payload CMS</span>
            <span className="tech-tag">Next.js 15</span>
            <span className="tech-tag">PostgreSQL</span>
            <span className="tech-tag">TypeScript</span>
            <span className="tech-tag">Multi-tenant</span>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .demo-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%);
          padding: 2rem 0;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .demo-header {
          text-align: center;
          margin-bottom: 4rem;
          color: white;
        }

        .demo-header h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          font-weight: 800;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .demo-content {
          margin-bottom: 4rem;
        }

        .demo-grid {
          display: grid;
          gap: 3rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
          color: white;
        }

        .section-header h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .section-header p {
          opacity: 0.8;
          font-size: 1.1rem;
        }

        .form-demo-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .form-container {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .features-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .feature-card p {
          opacity: 0.9;
          line-height: 1.5;
        }

        .api-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .api-grid {
          display: grid;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .api-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 12px;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .api-method {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          min-width: 60px;
          text-align: center;
        }

        .api-method.get {
          background: #10b981;
          color: white;
        }

        .api-method.post {
          background: #f59e0b;
          color: white;
        }

        .api-info h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .api-info p {
          margin: 0;
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .status-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .status-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .status-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #fbbf24;
        }

        .status-label {
          font-weight: 500;
          opacity: 0.9;
        }

        .demo-footer {
          text-align: center;
          color: white;
          opacity: 0.8;
        }

        .demo-footer p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .tech-stack {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tech-tag {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .demo-header h1 {
            font-size: 2.5rem;
          }
          
          .form-demo-section,
          .features-section,
          .api-section,
          .status-section {
            padding: 1.5rem;
          }

          .form-container {
            padding: 1.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .status-grid {
            grid-template-columns: 1fr;
          }

          .tech-stack {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}
