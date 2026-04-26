export interface ContactFormData {
  name:    string
  company: string
  email:   string
  phone?:  string
  service: string
  budget?: string
  message: string
  _honey:  string
  _csrf:   string
}

export interface ApiResponse {
  ok:      boolean
  message?: string
  errors?:  Record<string, string[]>
}
