// TODO: refactor to use useState instead of useReducer

interface FormState {
  age: number
  tags: string[]
  gender: string
  secret: string
  likes: number
  dislikes: number
}

type FormAction =
  | { type: 'setField'; field: string; value: string | number | string[] }
  | { type: 'setLikes'; value: number }
  | { type: 'setDislikes'; value: number }
  | { type: 'reset' }

export const initialState: FormState = {
  age: 15,
  tags: [],
  gender: '',
  secret: '',
  likes: 0,
  dislikes: 0,
}

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
  case 'setField':
    return { ...state, [action.field]: action.value }
  case 'reset':
    return initialState
  case 'setLikes':
    return { ...state, likes: action.value }
  case 'setDislikes':
    return { ...state, dislikes: action.value }
  default:
    return state
  }
}
