"use client";
import React, { useState } from "react";
import useFormData from "../../../../_hooks/useFormData";
import { API_URLS } from "../../../../_config/apiConfig";

// TODO: 시멘틱 태그로 바꾸기
// id, username, phone_number, password, email, title, content
export default function Edit() {
  const INQUIRY_API = API_URLS.inquiries;

  const [inquiryContents, setInquiryContents] = useState<
    typeof INQUIRY_API.method.post
  >({
    author: "test user",
    phone_number: "01000000000",
    email: "test@email.com",
    title: "test title",
    content: "test content",
    password: "testPassword",
    files: null,
  });

  const { handleChange, handleSubmit } = useFormData(
    INQUIRY_API,
    inquiryContents,
    setInquiryContents
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          이름
          <input
            type="text"
            name="username"
            id="username"
            value={inquiryContents.title}
            onChange={handleChange}
          />
        </label>
        <label>
          전화번호
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={inquiryContents.title}
            onChange={handleChange}
          />
        </label>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
