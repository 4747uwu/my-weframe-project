'use client'

import DemoPageClient from '@/components/DemoPageClient'
import React from 'react'

interface FormField {
  name: string
  label: string
  type: string
  required: boolean
}

interface DemoForm {
  id: string | number
  title: string
  fields: FormField[]
}

export default function FormDemoPage() {
  // Use static demo data for now to avoid server-side issues
  const demoForm: DemoForm = {
    id: 'demo-contact',
    title: 'Demo Contact Form',
    fields: [
      {
        name: 'name',
        label: 'Your Name',
        type: 'text',
        required: true
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true
      },
      {
        name: 'company',
        label: 'Company',
        type: 'text',
        required: false
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        required: true
      }
    ]
  }

  const forms: DemoForm[] = [demoForm]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          WeframeTech Form Builder Demo
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Features Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              ✅ Features Implemented
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>🏢 Multi-tenant architecture</li>
              <li>📝 Dynamic form builder</li>
              <li>🔐 Role-based access control</li>
              <li>📊 Form submissions tracking</li>
              <li>⚙️ Admin panel integration</li>
              <li>🌐 RESTful APIs</li>
            </ul>
          </div>

          {/* Test Links Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              🔗 Test Links
            </h2>
            <div className="space-y-3">
              <a 
                href="/admin" 
                className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-center"
              >
                Admin Panel →
              </a>
              <a 
                href="/contact" 
                className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-center"
              >
                Contact Form →
              </a>
              <a 
                href="/api/forms" 
                className="block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors text-center"
              >
                Forms API →
              </a>
            </div>
          </div>

          {/* Login Credentials Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">
              🔑 Login Credentials
            </h2>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-100 p-3 rounded">
                <strong>Super Admin:</strong><br />
                admin@weframetech.com<br />
                admin123
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <strong>Tenant Admin:</strong><br />
                tenant@weframetech.com<br />
                tenant123
              </div>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📊 Project Status
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Backend Implementation:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ PayloadCMS with PostgreSQL</li>
                <li>✅ Multi-tenant collections</li>
                <li>✅ Form builder plugin</li>
                <li>✅ API endpoints</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Frontend Implementation:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ Next.js 15 with App Router</li>
                <li>✅ Responsive design</li>
                <li>✅ Form submission handling</li>
                <li>✅ Admin panel integration</li>
              </ul>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}
