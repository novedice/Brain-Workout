export const isEmailValid = (str: string): string => {
  if (
    str.length < 4 ||
    !str.includes('@') ||
    !str.includes('.') ||
    str.startsWith('@') ||
    str.lastIndexOf('.') < str.lastIndexOf('@')
  ) {
    return 'Please enter valid email';
  }
  return '';
};
