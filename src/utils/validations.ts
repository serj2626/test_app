export const validateText = (text: string) => {
  let error = ''
  if (!text.trim()) {
    error = 'Поле не должно быть пустым'
    return error
  }
  return error
}
