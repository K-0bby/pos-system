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
    qty: 30,
    inStock: true,
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
    qty: 12,
    inStock: true,
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
    qty: 10,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/9d/b0/62/9db062193b2259352f71d4b55091b849.jpg",
  },
  {
    id: "11",
    name: "JACK DANIEL'S",
    category: "Wine & Spirit",
    price: { retail: 120.0, wholesale: 100.0 },
    qty: 15,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/03/96/2f/03962f6ebacefc413dcfc0ce9a14e2e6.jpg",
  },
  {
    id: "12",
    name: "ABSOLUT VODKA",
    category: "Wine & Spirit",
    price: { retail: 90.0, wholesale: 80.0 },
    qty: 15,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/ed/6b/ca/ed6bca3f6979a983761f6a91544fd3c9.jpg",
  },
  {
    id: "13",
    name: "TROEGS PERPETUAL IPA",
    category: "Beer",
    price: { retail: 34.0, wholesale: 30.0 },
    qty: 15,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/9e/b4/84/9eb4845cf692145feff66799e42bf18e.jpg",
  },
  {
    id: "14",
    name: "SAM ADAMS",
    category: "Beer",
    price: { retail: 31.0, wholesale: 28.0 },
    qty: 20,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/02/e3/2e/02e32e09f8d0f8454a6e3bfaf3b7b602.jpg",
  },
  {
    id: "15",
    name: "KONA BREWING CO.",
    category: "Beer",
    price: { retail: 32.0, wholesale: 29.0 },
    qty: 16,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/c0/ae/6c/c0ae6c9d9b43e452e2ac3fcf8d2dbc2e.jpg",
  },
  {
    id: "16",
    name: "TROEGS PERPETUAL IPA",
    category: "Beer",
    price: { retail: 42.0, wholesale: 39.0 },
    qty: 15,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/9e/b4/84/9eb4845cf692145feff66799e42bf18e.jpg",
  },
  {
    id: "17",
    name: "RADLER",
    category: "Beer",
    price: { retail: 40.0, wholesale: 35.0 },
    qty: 20,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/bc/7b/34/bc7b34f7bb0e8ff7e2d08f3fbce84495.jpg",
  },
  {
    id: "18",
    name: "MILLER LITE",
    category: "Beer",
    price: { retail: 20.0, wholesale: 15.0 },
    qty: 20,
    inStock: true,
    image:
      "https://i.pinimg.com/564x/4c/a4/54/4ca454e562753b49a860d9987edf6718.jpg",
  },
  {
    id: "19",
    name: "COORS LIGHT",
    category: "Beer",
    price: { "retail": 21.0, "wholesale": 18.0 },
    qty: 19,
    inStock: true,
   image: "https://i.pinimg.com/564x/c1/e6/79/c1e6792e8a8bed6f4d2757099b367026.jpg"
  },
  {
    id: "20",
    name: "SAPPORO",
    category: "Beer",
    price: { "retail": 29.0, "wholesale": 25.0 },
    qty: 20,
    inStock: true,
   image: "https://i.pinimg.com/564x/6e/c6/b6/6ec6b624a72a902d1e5216e6d73399b3.jpg"
  },
  {
    id: "21",
    name: "DOS EQUIS",
    category: "Beer",
    price: { "retail": 22.0, "wholesale": 19.0 },
    qty: 10,
    inStock: true,
   image: "https://i.pinimg.com/564x/f4/d6/44/f4d644c29c46e614f40df35fb99f135d.jpg"
  },
  {
    id: "22",
    name: "FOSTER'S",
    category: "Beer",
    price: { "retail": 24.0, "wholesale": 21.0 },
    qty: 18,
    inStock: true,
   image: "https://i.pinimg.com/564x/01/6c/e8/016ce8cbcf6bccf4cc7a2019b50a7641.jpg"
  },
  {
    id: "23",
    name: "NEWCASTLE BROWN ALE",
    category: "Beer",
    price: { "retail": 27.0, "wholesale": 23.0 },
    qty: 16,
    inStock: true,
   image: "https://i.pinimg.com/564x/24/78/49/2478499732f07ce4debf00789c1130a9.jpg"
  },
  {
    id: "24",
    name: "JACK DANIEL'S",
    category: "Wine & Spirit",
    price: { "retail": 120.0, "wholesale": 105.0 },
    qty: 15,
    inStock: true,
   image: "https://i.pinimg.com/564x/03/96/2f/03962f6ebacefc413dcfc0ce9a14e2e6.jpg"
  },
  {
    id: "26",
    name: "CROWN ROYAL",
    category: "Wine & Spirit",
    price: { "retail": 110.0, "wholesale": 95.0 },
    qty: 18,
    inStock: true,
   image: "https://i.pinimg.com/564x/2a/51/bd/2a51bd946b4a32f6e5905991eb1a0bd4.jpg"
  },
  {
    id: "27",
    name: "MOET & CHANDON",
    category: "Wine & Spirit",
    price: { "retail": 250.0, "wholesale": 230.0 },
    qty: 15,
    inStock: true,
   image: "https://i.pinimg.com/564x/ee/e2/d1/eee2d1453bddaec3849749a8c387b017.jpg"
  },
  {
    id: "28",
    name: "HENNESSY",
    category: "Wine & Spirit",
    price: { "retail": 150.0, "wholesale": 135.0 },
    qty: 20,
    inStock: true,
   image: "https://i.pinimg.com/564x/c8/62/84/c862845f2a31b326fcf7e651304f0472.jpg"
  },
  {
    id: "29",
    name: "BOMBAY SAPPHIRE",
    category: "Wine & Spirit",
    price: { "retail": 95.0, "wholesale": 85.0 },
    qty: 20,
    inStock: true,
   image: "https://i.pinimg.com/564x/ab/1a/6c/ab1a6ccbcdefaf490f432b1483914857.jpg"
  },
  {
    id: "30",
    name: "CAPTAIN MORGAN",
    category: "Wine & Spirit",
    price: { "retail": 85.0, "wholesale": 75.0 },
    qty: 10,
    inStock: true,
   image: "https://i.pinimg.com/564x/86/e2/16/86e21657cb7c6b1b324b00f22a09a031.jpg"
  }
];
