// "use client";
// import { useEffect, useState } from "react";
// import axiosInstance from "@/_config/axiosInstance";
// import { CertificateType } from "@/_types/certificate";

// // TODO: 엥.. 다른 훅으로 통합하기
// const useCertificate = () => {
//   const [certificates, setCertificates] = useState<CertificateType[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const fetchCertificates = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get("/company/certificates");
//       console.log("certificates", response.data);
//       setCertificates(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("에러", error);
//     }
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

//   return { certificates, setCertificates, isLoading };
// };
// export default useCertificate;
