import { Secrets } from 'types/secrets'

const urllikes = `${import.meta.env.VITE_API_URL}api/updatelikes`
const urldislikes = `${import.meta.env.VITE_API_URL}api/updatedislikes`

export module secretsService {
  // TODO: Refactor this code to use a single function for like and dislike
  export const addLike = async (id: string, secret: Secrets) => {
    await fetch(urllikes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        likes: secret.likes,
        isLike: true,
      }),
    })
    localStorage.setItem(`like-${id}`, id)
  }

  export const removeLike = async (id: string, secret: Secrets) => {
    await fetch(urllikes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        likes: secret.likes - 1,
        isLike: false,
      }),
    })
    localStorage.removeItem(`like-${id}`)
  }

  export const addDislike = async (id: string, secret: Secrets) => {
    await fetch(urldislikes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        dislikes: secret.dislikes,
        isDislike: true,
      }),
    })
    localStorage.setItem(`dislike-${id}`, id)
  }

  export const removeDislike = async (id: string, secret: Secrets) => {
    await fetch(urldislikes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        dislikes: secret.dislikes + 1,
        isDislike: false,
      }),
    })
    localStorage.removeItem(`dislike-${id}`)
  }
}
