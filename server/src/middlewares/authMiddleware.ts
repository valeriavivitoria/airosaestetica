import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export type AuthRequest = Request & { user?: { id: number; role: string } }

export function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.replace('Bearer ', '')
  if (!token) return response.status(401).json({ error: 'Autenticação necessária.' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string; role: string }
    ;(request as AuthRequest).user = { id: Number(payload.sub), role: payload.role }
    return next()
  } catch {
    return response.status(401).json({ error: 'Token inválido ou expirado.' })
  }
}

export function adminOnly(request: Request, response: Response, next: NextFunction) {
  if ((request as AuthRequest).user?.role !== 'ADMIN') return response.status(403).json({ error: 'Acesso administrativo necessário.' })
  return next()
}
