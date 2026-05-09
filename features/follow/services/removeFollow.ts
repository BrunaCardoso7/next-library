export async function removeFollow(
  payload: {
    id_book: number
    id_onboarding_user: number
  }
) {
  const res = await fetch(`/api/follow`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('Erro ao remover reação')
  }

  return res.json()
}
