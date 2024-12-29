const apiUrl = "https://fakestoreapi.com/products";
const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "col-md-3";
        productCard.innerHTML = `
      <div class="card product-card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.category}</p>
          <p class="card-text text-success">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;
        productsContainer.appendChild(productCard);
    });
}

searchButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.toLowerCase();
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm));
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error filtering products:", error);
    }
});

fetchProducts();
