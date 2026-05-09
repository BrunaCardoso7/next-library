export async function createFollow(
  payload: {
    id_book: number
    id_onboarding_user: number
    type: 'UP' | 'DOWN'
  }
) {
  const res = await fetch('/api/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_book: payload.id_book,
      id_onboarding_user: payload.id_onboarding_user,
      is_followup: payload.type === 'UP',
      is_followdown: payload.type === 'DOWN',
    }),
  })

  if (!res.ok) {
    throw new Error(
      'Erro ao reagir ao livro'
    )
  }

  return res.json()
}