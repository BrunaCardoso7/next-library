
interface GetBooksParams {
  page?: number
  limit?: number
  id_onboarding_user?: number
}

async function getBooks({ page = 1, limit = 10, id_onboarding_user }: GetBooksParams = {}) {
  const skip = (page - 1) * limit
  
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    skip: skip.toString(),
  })

  if (id_onboarding_user) {
    queryParams.append('id_onboarding_user', id_onboarding_user.toString())
  }
  
  const res = await fetch(`/api/book/with-reactions?${queryParams}`, {
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