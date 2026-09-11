const initialOrders = [
  {
    id: "#1048",
    customer: "Anna Petrova",
    city: "Sofia",
    status: "Paid",
    fulfillment: "Shipped",
    total: 129
  },
  {
    id: "#1047",
    customer: "Georgi Ivanov",
    city: "Plovdiv",
    status: "Paid",
    fulfillment: "Processing",
    total: 89
  },
  {
    id: "#1046",
    customer: "Maria Nikolova",
    city: "Varna",
    status: "Pending",
    fulfillment: "Processing",
    total: 159
  },
  {
    id: "#1045",
    customer: "Daniel Stoyanov",
    city: "Burgas",
    status: "Paid",
    fulfillment: "Delivered",
    total: 74
  },
  {
    id: "#1044",
    customer: "Elena Dimitrova",
    city: "Sofia",
    status: "Refunded",
    fulfillment: "Returned",
    total: 64
  },
  {
    id: "#1043",
    customer: "Martin Georgiev",
    city: "Ruse",
    status: "Paid",
    fulfillment: "Shipped",
    total: 118
  },
  {
    id: "#1042",
    customer: "Nikolay Petrov",
    city: "Sofia",
    status: "Pending",
    fulfillment: "Processing",
    total: 95
  },
  {
    id: "#1041",
    customer: "Victoria Ivanova",
    city: "Plovdiv",
    status: "Paid",
    fulfillment: "Delivered",
    total: 142
  }
];

const initialProducts = [
  {
    id: 1,
    name: "Core Oversized Tee",
    category: "T-Shirts",
    price: 59,
    stock: 18
  },
  {
    id: 2,
    name: "Structure Tee",
    category: "T-Shirts",
    price: 64,
    stock: 7
  },
  {
    id: 3,
    name: "Form Heavy Tee",
    category: "T-Shirts",
    price: 69,
    stock: 3
  },
  {
    id: 4,
    name: "Studio Hoodie",
    category: "Hoodies",
    price: 89,
    stock: 11
  },
  {
    id: 5,
    name: "Mono Cap",
    category: "Accessories",
    price: 39,
    stock: 24
  },
  {
    id: 6,
    name: "Utility Tote",
    category: "Accessories",
    price: 34,
    stock: 2
  }
];

const customers = [
  {
    name: "Anna Petrova",
    location: "Sofia",
    orders: 8,
    totalSpent: 842,
    segment: "VIP"
  },
  {
    name: "Georgi Ivanov",
    location: "Plovdiv",
    orders: 5,
    totalSpent: 418,
    segment: "Returning"
  },
  {
    name: "Maria Nikolova",
    location: "Varna",
    orders: 4,
    totalSpent: 362,
    segment: "Returning"
  },
  {
    name: "Daniel Stoyanov",
    location: "Burgas",
    orders: 2,
    totalSpent: 154,
    segment: "New"
  },
  {
    name: "Elena Dimitrova",
    location: "Sofia",
    orders: 7,
    totalSpent: 711,
    segment: "VIP"
  },
  {
    name: "Martin Georgiev",
    location: "Ruse",
    orders: 3,
    totalSpent: 284,
    segment: "Returning"
  }
];

const revenueData = {
  7: {
    current: [980, 1240, 1100, 1540, 1680, 1490, 1910],
    previous: [860, 1010, 970, 1320, 1210, 1380, 1460]
  },

  30: {
    current: [
      620, 710, 680, 790, 840, 760, 910,
      870, 940, 1010, 960, 1100, 1180, 1050,
      1220, 1280, 1190, 1360, 1420, 1310, 1490,
      1510, 1460, 1580, 1660, 1610, 1730, 1690,
      1810, 1920
    ],

    previous: [
      540, 610, 590, 650, 690, 640, 720,
      700, 760, 790, 750, 820, 860, 810,
      900, 940, 890, 970, 1010, 960, 1080,
      1110, 1060, 1150, 1190, 1170, 1240, 1210,
      1290, 1360
    ]
  },

  90: {
    current: [
      18200, 19400, 20500, 21800, 22600, 23900,
      24700, 25800, 26900, 28100, 29400, 31200
    ],

    previous: [
      16400, 17300, 18100, 19200, 20100, 21100,
      21900, 22800, 23900, 24600, 25700, 26800
    ]
  }
};

const statsByRange = {
  7: {
    revenue: 9940,
    orders: 148,
    aov: 67.16,
    conversion: 3.6
  },

  30: {
    revenue: 24892,
    orders: 364,
    aov: 68.38,
    conversion: 3.8
  },

  90: {
    revenue: 73840,
    orders: 1089,
    aov: 67.81,
    conversion: 4.1
  }
};
