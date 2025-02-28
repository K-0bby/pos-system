export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    price: {
        retail: number;
        wholesale: number;
    };
    lastUpdated: string;
}

export const categories = ["Beer", "Wine & Spirit", "Tots", "Soft Drinks", "Others"];

export const inventoryData: InventoryItem[] = [
    {
        id: "1",
        name: "CORONA EXTRA",
        category: "Beer",
        currentStock: 100,
        minStock: 20,
        maxStock: 200,
        price: { retail: 23.0, wholesale: 20.0 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "2",
        name: "BUDWEISER BEER",
        category: "Beer",
        currentStock: 120,
        minStock: 25,
        maxStock: 250,
        price: { retail: 23.0, wholesale: 21.0 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "3",
        name: "HEINEKEN",
        category: "Beer",
        currentStock: 80,
        minStock: 30,
        maxStock: 180,
        price: { retail: 25.0, wholesale: 22.5 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "4",
        name: "STELLA ARTOIS",
        category: "Beer",
        currentStock: 60,
        minStock: 15,
        maxStock: 150,
        price: { retail: 27.0, wholesale: 24.0 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "5",
        name: "GUINNESS",
        category: "Beer",
        currentStock: 140,
        minStock: 40,
        maxStock: 300,
        price: { retail: 30.0, wholesale: 26.5 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "6",
        name: "JACK DANIEL'S",
        category: "Wine & Spirit",
        currentStock: 50,
        minStock: 10,
        maxStock: 100,
        price: { retail: 120.0, wholesale: 100.0 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "7",
        name: "ABSOLUT VODKA",
        category: "Wine & Spirit",
        currentStock: 70,
        minStock: 15,
        maxStock: 120,
        price: { retail: 90.0, wholesale: 80.0 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "8",
        name: "MOET & CHANDON",
        category: "Wine & Spirit",
        currentStock: 40,
        minStock: 10,
        maxStock: 90,
        price: { retail: 250.0, wholesale: 230.0 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "9",
        name: "HENNESSY",
        category: "Wine & Spirit",
        currentStock: 90,
        minStock: 25,
        maxStock: 180,
        price: { retail: 150.0, wholesale: 135.0 },
        lastUpdated: new Date().toISOString(),
    },
    {
        id: "10",
        name: "CAPTAIN MORGAN",
        category: "Wine & Spirit",
        currentStock: 60,
        minStock: 20,
        maxStock: 140,
        price: { retail: 85.0, wholesale: 75.0 },
        lastUpdated: new Date().toISOString(),
    }
];
