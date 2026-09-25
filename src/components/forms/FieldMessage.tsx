type FieldMessageProps = {
  message?: string
}

export function FieldMessage({ message }: FieldMessageProps) {
  return message ? <p className="field-error" role="alert">{message}</p> : null
}
