export interface EquipmentType {
  id: number;
  name: string;
  standard: string; // 규격
  price: number; // 가격
  purchased_year: number; // 구입 년도
  use: string; //용도
  image: string;
  own: string; // 보유기관
}
