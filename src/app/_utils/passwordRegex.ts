export const validatePassword = (password: string) => {
  const passwordRegex = /^[A-Za-z\d!@#$%^&*\-+_(){}\[\]:;'"/\\<>?]{1,254}$/;
  return passwordRegex.test(password);
};
