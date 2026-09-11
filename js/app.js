// ========================================
// ORBIT — APP CONTROLLER
// ========================================

let products = loadProducts();


// ========================================
// DOM REFERENCES
// ========================================

const notificationButton =
  document.getElementById("notificationButton");

const notificationPanel =
  document.getElementById("notificationPanel");

const notificationDot =
  document.getElementById("notificationDot");

const markNotificationsRead =
  document.getElementById("markNotificationsRead");

const navItems = document.querySelectorAll(".nav-item[data-view]");
const views = document.querySelectorAll(".view");
const pageTitle = document.getElementById("pageTitle");

const dateRange = document.getElementById("dateRange");

const revenueStat = document.getElementById("revenueStat");
const ordersStat = document.getElementById("ordersStat");
const aovStat = document.getElementById("aovStat");
const conversionStat = document.getElementById("conversionStat");

const recentOrdersBody = document.getElementById("recentOrdersBody");
const ordersBody = document.getElementById("ordersBody");
const customersBody = document.getElementById("customersBody");

const orderSearch = document.getElementById("orderSearch");
const orderStatusFilter = document.getElementById("orderStatusFilter");

const productSearch = document.getElementById("productSearch");
const stockFilter = document.getElementById("stockFilter");
const productGrid = document.getElementById("productGrid");

const addProductButton = document.getElementById("addProductButton");
const productModal = document.getElementById("productModal");
const closeProductModal = document.getElementById("closeProductModal");

const productForm = document.getElementById("productForm");
const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const modalTitle = document.getElementById("modalTitle");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const sidebar = document.getElementById("sidebar");

const themeButton = document.getElementById("themeButton");


// ========================================
// NAVIGATION
// ========================================

function switchView(viewName) {
  views.forEach(view => {
    view.classList.remove("active");
  });

  navItems.forEach(item => {
    item.classList.remove("active");
  });

  const selectedView = document.getElementById(
    `${viewName}View`
  );

  const selectedNavItem = document.querySelector(
    `.nav-item[data-view="${viewName}"]`
  );

  if (selectedView) {
    selectedView.classList.add("active");
  }

  if (selectedNavItem) {
    selectedNavItem.classList.add("active");
  }

  pageTitle.textContent =
    viewName.charAt(0).toUpperCase() +
    viewName.slice(1);

  sidebar.classList.remove("open");
}


navItems.forEach(item => {
  item.addEventListener("click", () => {
    switchView(item.dataset.view);
  });
});


document
  .querySelectorAll("[data-view-target]")
  .forEach(button => {
    button.addEventListener("click", () => {
      switchView(button.dataset.viewTarget);
    });
  });


// ========================================
// MOBILE SIDEBAR
// ========================================

mobileMenuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});


// ========================================
// KPI STATS
// ========================================

function updateStats(range) {
  const stats = statsByRange[range];

  if (!stats) return;

  revenueStat.textContent =
    `€${stats.revenue.toLocaleString()}`;

  ordersStat.textContent =
    stats.orders.toLocaleString();

  aovStat.textContent =
    `€${stats.aov.toFixed(2)}`;

  conversionStat.textContent =
    `${stats.conversion}%`;
}


dateRange.addEventListener("change", () => {
  const range = Number(dateRange.value);

  updateStats(range);
  updateRevenueChart(range);
});


// ========================================
// STATUS BADGES
// ========================================

function getStatusClass(status) {
  return status
    .toLowerCase()
    .replace(/\s+/g, "-");
}


function createStatusBadge(status) {
  return `
    <span class="status-badge ${getStatusClass(status)}">
      ${status}
    </span>
  `;
}


// ========================================
// RECENT ORDERS
// ========================================

function renderRecentOrders() {
  recentOrdersBody.innerHTML = "";

  initialOrders
    .slice(0, 5)
    .forEach(order => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <strong>${order.id}</strong>
        </td>

        <td>
          ${order.customer}
        </td>

        <td>
          ${order.city}
        </td>

        <td>
          ${createStatusBadge(order.status)}
        </td>

        <td>
          <strong>€${order.total}</strong>
        </td>
      `;

      recentOrdersBody.appendChild(row);
    });
}


// ========================================
// ORDERS
// ========================================

function renderOrders() {
  const searchTerm =
    orderSearch.value
      .toLowerCase()
      .trim();

  const selectedStatus =
    orderStatusFilter.value;

  const filteredOrders =
    initialOrders.filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer
          .toLowerCase()
          .includes(searchTerm) ||
        order.city
          .toLowerCase()
          .includes(searchTerm);

      const matchesStatus =
        selectedStatus === "all" ||
        order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

  ordersBody.innerHTML = "";

  if (filteredOrders.length === 0) {
    ordersBody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-table">
          No orders found.
        </td>
      </tr>
    `;

    return;
  }

  filteredOrders.forEach(order => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <strong>${order.id}</strong>
      </td>

      <td>
        ${order.customer}
      </td>

      <td>
        ${order.city}
      </td>

      <td>
        ${createStatusBadge(order.status)}
      </td>

      <td>
        ${createStatusBadge(order.fulfillment)}
      </td>

      <td>
        <strong>€${order.total}</strong>
      </td>
    `;

    ordersBody.appendChild(row);
  });
}


orderSearch.addEventListener(
  "input",
  renderOrders
);

orderStatusFilter.addEventListener(
  "change",
  renderOrders
);


// ========================================
// CUSTOMERS
// ========================================

function renderCustomers() {
  customersBody.innerHTML = "";

  customers.forEach(customer => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div class="customer-cell">
          <div class="customer-avatar">
            ${getInitials(customer.name)}
          </div>

          <strong>
            ${customer.name}
          </strong>
        </div>
      </td>

      <td>
        ${customer.location}
      </td>

      <td>
        ${customer.orders}
      </td>

      <td>
        <strong>
          €${customer.totalSpent.toLocaleString()}
        </strong>
      </td>

      <td>
        <span class="segment-badge ${customer.segment.toLowerCase()}">
          ${customer.segment}
        </span>
      </td>
    `;

    customersBody.appendChild(row);
  });
}


function getInitials(name) {
  return name
    .split(" ")
    .map(part => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


// ========================================
// PRODUCTS
// ========================================

function renderProducts() {
  const searchTerm =
    productSearch.value
      .toLowerCase()
      .trim();

  const selectedStock =
    stockFilter.value;

  const filteredProducts =
    products.filter(product => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm) ||
        product.category
          .toLowerCase()
          .includes(searchTerm);

      let matchesStock = true;

      if (selectedStock === "low") {
        matchesStock =
          product.stock <= 5;
      }

      if (selectedStock === "available") {
        matchesStock =
          product.stock > 5;
      }

      return matchesSearch && matchesStock;
    });

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-products">
        No products found.
      </div>
    `;

    return;
  }

  filteredProducts.forEach(product => {
    const card =
      document.createElement("article");

    card.className = "product-card";

    const stockState =
      product.stock <= 5
        ? "low-stock"
        : "in-stock";

    const stockLabel =
      product.stock <= 5
        ? "Low stock"
        : "In stock";

    card.innerHTML = `
      <div class="product-visual">
        ${product.name
          .charAt(0)
          .toUpperCase()}
      </div>

      <div class="product-card-body">

        <div class="product-card-top">

          <div>
            <small>
              ${product.category}
            </small>

            <h3>
              ${product.name}
            </h3>
          </div>

          <strong>
            €${product.price}
          </strong>

        </div>

        <div class="product-stock">

          <span class="${stockState}">
            ${stockLabel}
          </span>

          <strong>
            ${product.stock} units
          </strong>

        </div>

        <div class="product-actions">

          <button
            class="secondary-button edit-product"
            data-id="${product.id}"
          >
            Edit
          </button>

          <button
            class="danger-button delete-product"
            data-id="${product.id}"
          >
            Delete
          </button>

        </div>

      </div>
    `;

    productGrid.appendChild(card);
  });

  attachProductActions();
}


productSearch.addEventListener(
  "input",
  renderProducts
);

stockFilter.addEventListener(
  "change",
  renderProducts
);


// ========================================
// PRODUCT MODAL
// ========================================

function openProductModal(product = null) {
  productModal.classList.add("open");

  if (product) {
    modalTitle.textContent =
      "Edit product";

    productId.value =
      product.id;

    productName.value =
      product.name;

    productCategory.value =
      product.category;

    productPrice.value =
      product.price;

    productStock.value =
      product.stock;
  } else {
    modalTitle.textContent =
      "Add product";

    productForm.reset();

    productId.value = "";
  }
}


function closeProductModalHandler() {
  productModal.classList.remove("open");
}


addProductButton.addEventListener(
  "click",
  () => {
    openProductModal();
  }
);


closeProductModal.addEventListener(
  "click",
  closeProductModalHandler
);


productModal.addEventListener(
  "click",
  event => {
    if (event.target === productModal) {
      closeProductModalHandler();
    }
  }
);


// ========================================
// SAVE PRODUCT
// ========================================

productForm.addEventListener(
  "submit",
  event => {
    event.preventDefault();

    const idValue =
      productId.value;

    const productData = {
      id: idValue
        ? Number(idValue)
        : Date.now(),

      name:
        productName.value.trim(),

      category:
        productCategory.value.trim(),

      price:
        Number(productPrice.value),

      stock:
        Number(productStock.value)
    };

    if (idValue) {
      products =
        products.map(product =>
          product.id === Number(idValue)
            ? productData
            : product
        );
    } else {
      products.push(productData);
    }

    saveProducts(products);

    renderProducts();

    closeProductModalHandler();
  }
);


// ========================================
// PRODUCT ACTIONS
// ========================================

function attachProductActions() {
  document
    .querySelectorAll(".edit-product")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          const id =
            Number(button.dataset.id);

          const product =
            products.find(
              item => item.id === id
            );

          if (product) {
            openProductModal(product);
          }
        }
      );
    });


  document
    .querySelectorAll(".delete-product")
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          const id =
            Number(button.dataset.id);

          const product =
            products.find(
              item => item.id === id
            );

          if (!product) return;

          const confirmed =
            confirm(
              `Delete "${product.name}"?`
            );

          if (!confirmed) return;

          products =
            products.filter(
              item => item.id !== id
            );

          saveProducts(products);

          renderProducts();
        }
      );
    });
}


// ========================================
// THEME
// ========================================

const THEME_KEY = "orbit-theme";

function applyStoredTheme() {
  const storedTheme =
    localStorage.getItem(THEME_KEY);

  if (storedTheme === "dark") {
    document.body.classList.add(
      "dark-theme"
    );
  }
}


themeButton.addEventListener(
  "click",
  () => {
    document.body.classList.toggle(
      "dark-theme"
    );

    const theme =
      document.body.classList.contains(
        "dark-theme"
      )
        ? "dark"
        : "light";

    localStorage.setItem(
      THEME_KEY,
      theme
    );
  }
);


// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener(
  "keydown",
  event => {
    if (event.key === "Escape") {
      productModal.classList.remove(
        "open"
      notificationPanel.classList.remove("open");
      );
      

      sidebar.classList.remove(
        "open"
      );
    }
  }
);


// ========================================
// INITIALIZE APP
// ========================================

function initializeApp() {
  applyStoredTheme();

  updateStats(30);

  renderRecentOrders();
  renderOrders();
  renderProducts();
  renderCustomers();

  buildRevenueChart(30);
}
// ========================================
// NOTIFICATIONS
// ========================================

notificationButton.addEventListener(
  "click",
  event => {
    event.stopPropagation();

    notificationPanel.classList.toggle(
      "open"
    );
  }
);


document.addEventListener(
  "click",
  event => {
    if (
      !notificationPanel.contains(event.target) &&
      !notificationButton.contains(event.target)
    ) {
      notificationPanel.classList.remove(
        "open"
      );
    }
  }
);


markNotificationsRead.addEventListener(
  "click",
  () => {
    document
      .querySelectorAll(
        ".notification-item.unread"
      )
      .forEach(item => {
        item.classList.remove("unread");
      });

    notificationDot.classList.add(
      "hidden"
    );
  }
);
initializeApp();
