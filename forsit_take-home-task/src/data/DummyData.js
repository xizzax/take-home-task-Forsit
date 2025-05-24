export const productCategories = [
    'Cosmetics',
    'Health',   
    'Food & Drink',
]

export const productInventoryData = [
    {
        id: '001',
        name: 'Lotion',
        category: 'Cosmetics',
        price: 30,
        available_inventory: 20,
    },
    {
        id: '002',
        name: 'Serum',
        category: 'Cosmetics',
        price: 50,
        available_inventory: 10,
    },
    {
        id: '003',
        name: 'Toner',
        category: 'Cosmetics',
        price: 40,
        available_inventory: 15,
    },
    {
        id: '004',
        name: 'Cream',
        category: 'Cosmetics',
        price: 60,
        available_inventory: 5,
    },
    {
        id: '005',
        name: 'Mask',
        category: 'Health',
        price: 70,
        available_inventory: 3,
    },
    {
        id: '006',
        name: 'Vitamin C',
        category: 'Health',
        price: 80,
        available_inventory: 2,
    },
    {
        id: '007',
        name: 'Energy Drink',
        category: 'Food & Drink',
        price: 90,
        available_inventory: 1,
    },
    {
        id: '008',
        name: 'Chips',
        category: 'Food & Drink',
        price: 100,
        available_inventory: 0,
    },
]

const orderData = [
    {
        date: "2025-05-23",
        details: [
            {
                order_id: 'O1',
                product_id: '001',
                quantity: 2,
            },
            {
                order_id: 'O1',
                product_id: '002',
                quantity: 1,
            },
            {
                order_id: 'O2',
                product_id: '003',
                quantity: 3,
            },
            {
                order_id: 'O2',
                product_id: '004',
                quantity: 2,
            },
        ]
    },
    {
        date: "2025-05-22",
        details: [
            {
                order_id: 'O3',
                product_id: '001',
                quantity: 1,
            },
            {
                order_id: 'O3',
                product_id: '002',
                quantity: 2,
            },
            {
                order_id: 'O4',
                product_id: '003',
                quantity: 1,
            },
        ]
    },
    {
        date: "2025-05-21",
        details: [
            {
                order_id: 'O5',
                product_id: '001',
                quantity: 3,
            },
            {
                order_id: 'O6',
                product_id: '002',
                quantity: 1,
            },
        ]
    }
]