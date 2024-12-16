export const getAuthHeaders = (password?: string | null) => {
  const token = getToken();

  const headers: { authorization?: string; password?: string } = {};

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  if (password) {
    headers.password = password;
  }
  return {
    headers,
  };
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};
