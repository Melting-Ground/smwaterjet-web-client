export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("사용자 토큰이 없습니다.");
  }
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};
