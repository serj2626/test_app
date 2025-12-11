export const validateText = (text: string) => {
  let error = ''
  if (!text.trim()) error = 'Поле не должно быть пустым'
  if (text.trim().length < 3) error = 'Поле не должно быть менее 3 символов'
  return error
}
