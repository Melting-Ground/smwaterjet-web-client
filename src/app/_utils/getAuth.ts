export const getAuthHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error("사용자 토큰이 없습니다.");
  }
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};
