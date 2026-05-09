import { BooksFormData } from "../schemas/book.schema"

async function createBook( data : BooksFormData) {
  const res = await fetch('/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const payload = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(payload?.message || 'Erro ao criar livros')
  }

  return payload
}
export default createBook