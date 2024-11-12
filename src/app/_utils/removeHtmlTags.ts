export const removeHtmlTags = (text: string) => {
  return text.replace(/<[^>]+>/g, ""); // <b>와 같은 HTML 태그를 제거
};
