export const isNameValid = (str: string): string => {
  if (str.trim().length < 3) {
    return 'The name should be at least 3 characters';
  }
  return '';
};
