import { CertificateType } from "@/_types/certificate";
import { PhotoType } from "@/_types/photo";
import { useState } from "react";

export const useImageModal = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<
    PhotoType | CertificateType | null
  >(null);

  const onImageModalOpen = (item: PhotoType | CertificateType) => {
    setSelectedImage(item);
    setIsImageModalOpen(true);
  };
  const onImageModalClose = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  return {
    onImageModalOpen,
    isImageModalOpen,
    selectedImage,
    onImageModalClose,
  };
};
