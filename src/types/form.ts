export interface FormField {
  id: string
  name: string
  label: string
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox'
  required: boolean
  placeholder?: string
  options?: Array<{ label: string; value: string }>
}

export interface Tenant {
  id: string | number
  name: string
  slug: string
  domain?: string
  isActive: boolean
  settings: {
    allowFormCreation: boolean
    maxForms: number
  }
}

export interface Form {
  id: string | number
  title: string
  tenant: Tenant
  fields: FormField[]
  confirmationType: 'message' | 'redirect'
  confirmationMessage?: any
  redirect?: { url: string | null }
  emails?: any[]
  updatedAt: string
  createdAt: string
}

export interface FormsResponse {
  forms: Form[]
}

// Updated submission structure for Form Builder plugin
export interface FormSubmission {
  id: string | number
  form: Form
  submissionData: Array<{
    field: string
    value: string
  }>
  submittedAt: string
  submitterIP?: string
  submitterUserAgent?: string
}

export interface SubmissionResponse {
  success: boolean
  id?: string | number
  message?: string
  error?: string
  details?: string
}