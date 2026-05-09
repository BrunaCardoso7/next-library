
interface GetBooksParams {
  page?: number
  limit?: number
}

async function getBooks({ page = 1, limit = 10 }: GetBooksParams = {}) {
  const skip = (page - 1) * limit
  
  const res = await fetch(`/api/book?page=${page}&limit=${limit}&skip=${skip}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const payload = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(payload?.message || 'Erro ao listar livros')
  }

  return payload
}
export default getBooks