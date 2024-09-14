import { useState } from "react";

export const useNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>("");

  // nav sub list 열고 닫기
  const onOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  // nav sub list 안의 item에 마우스 호버
  const onNavItemHover = (currentItem: string) => {
    setCurrentItem(currentItem);
  };

  return { isOpen, onOpen, currentItem, onNavItemHover };
};
