export type Category =
  | "Beer"
  | "Wine & Spirit"
  | "Tots"
  | "Soft Drinks"
  | "Others";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: {
    retail: number;
    wholesale: number;
  };
  qty: number; // Quantity available in stock
  inStock: boolean; // Automatically updates based on qty
  image: string;
}

export const drinks: Product[] = [
  {
    id: "1",
    name: "CORONA EXTRA",
    category: "Beer",
    price: { retail: 23.0, wholesale: 20.0 },
    qty: 10,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/e3/a2/ad/e3a2ad320625dc3dba3466b4240f5ce4.jpg",
  },
  {
    id: "2",
    name: "BUDWEISER BEER",
    category: "Beer",
    price: { retail: 23.0, wholesale: 21.0 },
    qty: 12,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/23/db/ff/23dbff251681245b9dbbdd83a9753e3c.jpg",
  },
  {
    id: "3",
    name: "HEINEKEN",
    category: "Beer",
    price: { retail: 25.0, wholesale: 22.5 },
    qty: 15,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/96/eb/4f/96eb4fca2cd991c6ae59d209b643008f.jpg",
  },
  {
    id: "4",
    name: "STELLA ARTOIS",
    category: "Beer",
    price: { retail: 27.0, wholesale: 24.0 },
    qty: 8,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/45/a7/a3/45a7a38523529db2a289d82a1b795347.jpg",
  },
  {
    id: "5",
    name: "GUINNESS",
    category: "Beer",
    price: { retail: 30.0, wholesale: 26.5 },
    qty: 0,
    inStock: false,
    image:
      "https://i.pinimg.com/564x/a2/e6/ef/a2e6ef8a91488f04ff0caa53cd96c62e.jpg",
  },
  {
    id: "6",
    name: "AMSTEL LIGHT",
    category: "Beer",
    price: { retail: 22.0, wholesale: 19.0 },
    qty: 20,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/fd/da/a6/fddaa6ba2426e38a30f4b8f5a088fe06.jpg",
  },
  {
    id: "7",
    name: "CARLSBERG",
    category: "Beer",
    price: { retail: 24.0, wholesale: 21.0 },
    qty: 10,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/0a/d3/ce/0ad3ce6c2a06628e54046daf88bfb5d7.jpg",
  },
  {
    id: "8",
    name: "PILSNER URQUELL",
    category: "Beer",
    price: { retail: 26.0, wholesale: 22.5 },
    qty: 0,
    inStock: false,
    image:
      "https://i.pinimg.com/564x/f6/a2/3b/f6a23bcc5434eb2d84b0a97a232cfa32.jpg",
  },
  {
    id: "9",
    name: "BLUE MOON",
    category: "Beer",
    price: { retail: 28.0, wholesale: 24.5 },
    qty: 10,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/63/92/e7/6392e704f996ffb879709c27e2078739.jpg",
  },
  {
    id: "10",
    name: "LEFFE BLOND",
    category: "Beer",
    price: { retail: 29.0, wholesale: 25.0 },
    qty: 0,
    inStock: false,
    image:
      "https://i.pinimg.com/564x/9d/b0/62/9db062193b2259352f71d4b55091b849.jpg",
  },
  {
    id: "11",
    name: "JACK DANIEL'S",
    category: "Wine & Spirit",
    price: { retail: 120.0, wholesale: 100.0 },
    qty: 5,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/03/96/2f/03962f6ebacefc413dcfc0ce9a14e2e6.jpg",
  },
  {
    id: "12",
    name: "ABSOLUT VODKA",
    category: "Wine & Spirit",
    price: { retail: 90.0, wholesale: 80.0 },
    qty: 0,
    inStock: false,
    image:
      "https://i.pinimg.com/564x/ed/6b/ca/ed6bca3f6979a983761f6a91544fd3c9.jpg",
  },
  {
    id: "13",
    name: "TROEGS PERPETUAL IPA",
    category: "Beer",
    price: { retail: 34.0, wholesale: 30.0 },
    qty: 5,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/9e/b4/84/9eb4845cf692145feff66799e42bf18e.jpg",
  },
  {
    id: "14",
    name: "SAM ADAMS",
    category: "Beer",
    price: { retail: 31.0, wholesale: 28.0 },
    qty: 11,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/02/e3/2e/02e32e09f8d0f8454a6e3bfaf3b7b602.jpg",
  },
  {
    id: "15",
    name: "KONA BREWING CO.",
    category: "Beer",
    price: { retail: 32.0, wholesale: 29.0 },
    qty: 6,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/c0/ae/6c/c0ae6c9d9b43e452e2ac3fcf8d2dbc2e.jpg",
  },
];
