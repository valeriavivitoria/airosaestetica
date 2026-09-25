import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) return response.status(422).json({ error: 'Dados inválidos.', details: error.issues.map((issue) => issue.message) })
  if (error instanceof Error && 'statusCode' in error) return response.status(Number(error.statusCode)).json({ error: error.message })
  console.error('Request failed:', error instanceof Error ? error.message : 'unknown error')
  return response.status(500).json({ error: 'Erro interno do servidor.' })
}
