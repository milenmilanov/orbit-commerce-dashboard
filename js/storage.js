const STORAGE_KEY = "orbit-products";

function loadProducts() {
  const storedProducts = localStorage.getItem(STORAGE_KEY);

  if (!storedProducts) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProducts)
    );

    return [...initialProducts];
  }

  try {
    return JSON.parse(storedProducts);
  } catch (error) {
    console.error("Unable to load stored products:", error);

    return [...initialProducts];
  }
}

function saveProducts(products) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
}

function resetProducts() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialProducts)
  );

  return [...initialProducts];
}
