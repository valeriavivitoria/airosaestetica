const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const apiEnabled = Boolean(baseUrl)

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) { super(message); this.status = status }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}) {
  if (!baseUrl) throw new ApiError('API não configurada.', 0)
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } })
  const payload = await response.json().catch(() => ({})) as { error?: string }
  if (!response.ok) throw new ApiError(payload.error || 'Não foi possível concluir a solicitação.', response.status)
  return payload as T
}
