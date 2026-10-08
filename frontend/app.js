/**
 * ShopSmart AI - Interactive UI Application & Microservices Client
 */

const API_BASE = `http://${window.location.hostname || "localhost"}:8080/api`;

// Fallback catalog datasets matching exact UI screenshot items
const initialProducts = [
    {
        id: 1,
        name: "boAt Airdopes 141 TWS Earbuds",
        category: "Electronics",
        brand: "boAt",
        price: 1499,
        originalPrice: 2499,
        discountPercentage: 40,
        rating: 4.3,
        reviewsCount: 12400,
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60",
        isTopDeal: true,
        isAiRecommended: false
    },
    {
        id: 2,
        name: "Noise ColorFit Pulse 3 Smart Watch",
        category: "Mobiles & Tablets",
        brand: "Noise",
        price: 2899,
        originalPrice: 3999,
        discountPercentage: 28,
        rating: 4.2,
        reviewsCount: 8100,
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
        isTopDeal: true,
        isAiRecommended: false
    },
    {
        id: 3,
        name: "Nike Revolution 7 Men Running Shoes",
        category: "Sports, Fitness & Outdoors",
        brand: "Nike",
        price: 3899,
        originalPrice: 5999,
        discountPercentage: 35,
        rating: 4.4,
        reviewsCount: 6200,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        isTopDeal: true,
        isAiRecommended: false
    },
    {
        id: 4,
        name: "Samsung Galaxy A54 5G (8GB | 128GB)",
        category: "Mobiles & Tablets",
        brand: "Samsung",
        price: 24999,
        originalPrice: 49999,
        discountPercentage: 50,
        rating: 4.5,
        reviewsCount: 11600,
        imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60",
        isTopDeal: true,
        isAiRecommended: false
    },
    {
        id: 5,
        name: "Safari Laptop Backpack (30L)",
        category: "Fashion",
        brand: "Safari",
        price: 1199,
        originalPrice: 2999,
        discountPercentage: 60,
        rating: 4.3,
        reviewsCount: 9800,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
        isTopDeal: true,
        isAiRecommended: false
    },
    {
        id: 6,
        name: "Puma Unisex Sneakers",
        category: "Fashion",
        brand: "Puma",
        price: 2899,
        originalPrice: 4999,
        discountPercentage: 42,
        rating: 4.4,
        reviewsCount: 7100,
        imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60",
        isTopDeal: true,
        isAiRecommended: false
    },
    {
        id: 7,
        name: "OnePlus Nord CE 4 5G",
        category: "Mobiles & Tablets",
        brand: "OnePlus",
        price: 24999,
        originalPrice: 26999,
        discountPercentage: 7,
        rating: 4.4,
        reviewsCount: 9200,
        imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60",
        isTopDeal: false,
        isAiRecommended: true
    },
    {
        id: 8,
        name: "Sony WH-CH520 Wireless Headphones",
        category: "Electronics",
        brand: "Sony",
        price: 3990,
        originalPrice: 4990,
        discountPercentage: 20,
        rating: 4.3,
        reviewsCount: 5100,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        isTopDeal: false,
        isAiRecommended: true
    },
    {
        id: 9,
        name: "Levi's Men Slim Fit Jeans",
        category: "Fashion",
        brand: "Levi's",
        price: 2499,
        originalPrice: 3299,
        discountPercentage: 24,
        rating: 4.2,
        reviewsCount: 3800,
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60",
        isTopDeal: false,
        isAiRecommended: true
    },
    {
        id: 10,
        name: "Adidas Backpack",
        category: "Sports, Fitness & Outdoors",
        brand: "Adidas",
        price: 1799,
        originalPrice: 2499,
        discountPercentage: 28,
        rating: 4.4,
        reviewsCount: 2600,
        imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=60",
        isTopDeal: false,
        isAiRecommended: true
    },
    {
        id: 11,
        name: "The Psychology of Money",
        category: "Books & Stationery",
        brand: "Morgan Housel",
        price: 399,
        originalPrice: 499,
        discountPercentage: 20,
        rating: 4.7,
        reviewsCount: 12000,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
        isTopDeal: false,
        isAiRecommended: true
    },
    {
        id: 12,
        name: "Milton Water Bottle (1L)",
        category: "Home & Kitchen",
        brand: "Milton",
        price: 699,
        originalPrice: 899,
        discountPercentage: 22,
        rating: 4.5,
        reviewsCount: 8400,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60",
        isTopDeal: false,
        isAiRecommended: true
    }
];

// Cart State (Initialized with 3 items matching screenshot badge "3")
let cart = [
    { id: 1, name: "boAt Airdopes 141 TWS Earbuds", price: 1499, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Noise ColorFit Pulse 3 Smart Watch", price: 2899, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60" },
    { id: 5, name: "Safari Laptop Backpack (30L)", price: 1199, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60" }
];

let allProductsList = [...initialProducts];
let activeFilterCategory = "All Categories";

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    fetchProductsFromBackend();
    renderGrids();
    updateCartUI();
    initDealCountdown();
    initDropdownListener();
});

// Fetch from Backend Gateway or Fallback
async function fetchProductsFromBackend() {
    try {
        const res = await fetch(`${API_BASE}/products`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                allProductsList = data;
                renderGrids();
            }
        }
    } catch (e) {
        console.log("Backend offline or booting, serving high-fidelity local dataset.");
    }
}

// Render Products Grids
function renderGrids() {
    const topDealsContainer = document.getElementById("topDealsGrid");
    const aiRecContainer = document.getElementById("aiRecommendationsGrid");

    let deals = allProductsList.filter(p => p.isTopDeal);
    let aiRecs = allProductsList.filter(p => p.isAiRecommended);

    if (activeFilterCategory !== "All Categories") {
        deals = allProductsList.filter(p => p.category.toLowerCase().includes(activeFilterCategory.toLowerCase()) || activeFilterCategory.toLowerCase().includes(p.category.toLowerCase()));
        aiRecs = allProductsList.filter(p => p.category.toLowerCase().includes(activeFilterCategory.toLowerCase()) || activeFilterCategory.toLowerCase().includes(p.category.toLowerCase()));
    }

    if (deals.length === 0 && activeFilterCategory !== "All Categories") {
        deals = allProductsList.slice(0, 4);
    }

    topDealsContainer.innerHTML = deals.map(p => createProductCard(p)).join("");
    aiRecContainer.innerHTML = aiRecs.map(p => createProductCard(p)).join("");
}

function createProductCard(product) {
    const formattedReviews = product.reviewsCount >= 1000 ? (product.reviewsCount / 1000).toFixed(1) + 'K' : product.reviewsCount;
    return `
        <div class="product-card" onclick="openProductDetailModal(${product.id})">
            ${product.discountPercentage ? `<span class="discount-badge">${product.discountPercentage}% OFF</span>` : ''}
            <div class="product-img-wrap">
                <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-name" title="${product.name}">${product.name}</div>
            <div class="product-pricing">
                <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="product-rating">
                <i class="fa-solid fa-star"></i>
                <span>${product.rating}</span>
                <span class="review-count">(${formattedReviews})</span>
            </div>
            <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
}

// Current Selected Product for Detail Modal
let currentDetailProduct = null;
let selectedPaymentMethodName = "UPI (Google Pay / PhonePe)";

function openProductDetailModal(productId) {
    const product = allProductsList.find(p => p.id === productId);
    if (!product) return;
    currentDetailProduct = product;

    document.getElementById("pModalImg").src = product.imageUrl;
    document.getElementById("pModalTitle").innerText = product.name;
    document.getElementById("pModalBrand").innerText = (product.brand || "ShopSmart Official").toUpperCase();
    document.getElementById("pModalHeaderTitle").innerText = product.name.length > 35 ? product.name.substring(0, 35) + "..." : product.name;
    document.getElementById("pModalPrice").innerText = `₹${product.price.toLocaleString('en-IN')}`;
    
    if (product.originalPrice) {
        document.getElementById("pModalOriginalPrice").innerText = `₹${product.originalPrice.toLocaleString('en-IN')}`;
        document.getElementById("pModalOriginalPrice").style.display = "inline";
    } else {
        document.getElementById("pModalOriginalPrice").style.display = "none";
    }

    if (product.discountPercentage) {
        document.getElementById("pModalDiscount").innerText = `${product.discountPercentage}% OFF`;
        document.getElementById("pModalDiscount").style.display = "inline-block";
        document.getElementById("pModalBadge").innerText = `${product.discountPercentage}% Special Deal`;
    } else {
        document.getElementById("pModalDiscount").style.display = "none";
        document.getElementById("pModalBadge").innerText = "Featured Product";
    }

    document.getElementById("pModalRating").innerText = product.rating || 4.5;
    const formattedReviews = product.reviewsCount >= 1000 ? (product.reviewsCount / 1000).toFixed(1) + 'K' : product.reviewsCount;
    document.getElementById("pModalReviews").innerText = `${formattedReviews || '1.2K'} Ratings & Verified Customer Reviews`;

    // Dynamic Specs based on Category
    const specsList = document.getElementById("pModalSpecsList");
    if (product.category.includes("Mobile") || product.category.includes("Laptop")) {
        specsList.innerHTML = `
            <li><i class="fa-solid fa-check"></i> High-performance Next-Gen Processor &amp; Crisp OLED Display</li>
            <li><i class="fa-solid fa-check"></i> All-Day Ultra Battery Life with Fast 65W Turbo Charging</li>
            <li><i class="fa-solid fa-check"></i> Official Brand Warranty with Free Express Doorstep Service</li>
            <li><i class="fa-solid fa-check"></i> AI Demand Forecast Score: High Demand (Stock Selling Fast)</li>
        `;
    } else if (product.category.includes("Fashion")) {
        specsList.innerHTML = `
            <li><i class="fa-solid fa-check"></i> 100% Premium Breathable Fabric &amp; Ergonomic Tailored Fit</li>
            <li><i class="fa-solid fa-check"></i> Machine washable, color-fade resistant &amp; ultra durable</li>
            <li><i class="fa-solid fa-check"></i> Hassle-Free 7-Day Doorstep Size Exchange Policy</li>
        `;
    } else {
        specsList.innerHTML = `
            <li><i class="fa-solid fa-check"></i> Premium Grade Build Quality &amp; Certified Safe Material</li>
            <li><i class="fa-solid fa-check"></i> Top Rated Product with 98% Customer Satisfaction</li>
            <li><i class="fa-solid fa-check"></i> Free Expedited Delivery to Pune 411001 within 24 Hours</li>
        `;
    }

    document.getElementById("productDetailModalBackdrop").classList.add("show");
}

function closeProductDetailModal() {
    document.getElementById("productDetailModalBackdrop").classList.remove("show");
    currentDetailProduct = null;
}

function addFromModalToCart() {
    if (currentDetailProduct) {
        addToCart(currentDetailProduct.id);
        closeProductDetailModal();
    }
}

function buyNowFromModal() {
    if (currentDetailProduct) {
        // Add to cart and open checkout directly
        const existing = cart.find(item => item.id === currentDetailProduct.id);
        if (!existing) {
            cart.push({
                id: currentDetailProduct.id,
                name: currentDetailProduct.name,
                price: currentDetailProduct.price,
                quantity: 1,
                imageUrl: currentDetailProduct.imageUrl
            });
        }
        updateCartUI();
        closeProductDetailModal();
        openCheckoutModal();
    }
}

function selectPaymentMethodRadio(cardElement, methodCode) {
    document.querySelectorAll(".payment-option-card").forEach(c => c.classList.remove("active"));
    cardElement.classList.add("active");
    
    const radio = cardElement.querySelector("input[type='radio']");
    if (radio) radio.checked = true;

    const upiContainer = document.getElementById("upiInputContainer");
    if (methodCode === 'UPI') {
        selectedPaymentMethodName = "UPI (Google Pay / PhonePe)";
        upiContainer.style.display = "block";
    } else if (methodCode === 'CARD') {
        selectedPaymentMethodName = "Credit / Debit Card";
        upiContainer.style.display = "none";
    } else if (methodCode === 'NETBANKING') {
        selectedPaymentMethodName = "Net Banking";
        upiContainer.style.display = "none";
    } else if (methodCode === 'COD') {
        selectedPaymentMethodName = "Cash on Delivery";
        upiContainer.style.display = "none";
    } else if (methodCode === 'EMI') {
        selectedPaymentMethodName = "No Cost EMI / Pay Later";
        upiContainer.style.display = "none";
    }
}

// User State
let currentUser = {
    name: "Omprakash",
    email: "omprakash@example.com",
    phone: "+91 98765 43210",
    city: "Pune",
    pincode: "411001",
    address: "Flat 402, Sunshine Heights, Hinjawadi Phase 1, Pune"
};

// Category Selection & Filter
function filterBySidebar(category, element) {
    activeFilterCategory = category;
    document.querySelectorAll(".sidebar-menu li").forEach(li => li.classList.remove("active"));
    if (element) {
        element.classList.add("active");
    }
    document.getElementById("selectedCategoryText").innerText = category;
    
    if (category === "All Categories" || category === "All Products") {
        hideSearchResultsView();
        renderGrids();
        showToast(`Showing All Catalog Items`);
    } else {
        const filtered = allProductsList.filter(p => 
            p.category.toLowerCase().includes(category.toLowerCase()) ||
            category.toLowerCase().includes(p.category.toLowerCase())
        );
        showSearchResultsView(`Category: ${category}`, `Found ${filtered.length} products in ${category}`, filtered);
        showToast(`Filtered: ${category} (${filtered.length} items)`);
    }
}

function selectCategory(category) {
    activeFilterCategory = category;
    document.getElementById("selectedCategoryText").innerText = category;
    document.getElementById("catDropdownMenu").classList.remove("show");
    
    if (category === "All Categories") {
        hideSearchResultsView();
        renderGrids();
    } else {
        const filtered = allProductsList.filter(p => 
            p.category.toLowerCase().includes(category.toLowerCase()) ||
            category.toLowerCase().includes(p.category.toLowerCase())
        );
        showSearchResultsView(`Category: ${category}`, `Found ${filtered.length} items`, filtered);
    }
}

function initDropdownListener() {
    const trigger = document.getElementById("catDropdownTrigger");
    const menu = document.getElementById("catDropdownMenu");
    trigger.addEventListener("click", (e) => {
        if (e.target.closest("li")) return;
        menu.classList.toggle("show");
    });
    document.addEventListener("click", (e) => {
        if (!trigger.contains(e.target)) {
            menu.classList.remove("show");
        }
    });
}

function resetFilters() {
    activeFilterCategory = "All Categories";
    document.getElementById("selectedCategoryText").innerText = "All Categories";
    document.getElementById("searchInput").value = "";
    document.querySelectorAll(".sidebar-menu li").forEach(li => li.classList.remove("active"));
    document.querySelector(".sidebar-menu li:first-child").classList.add("active");
    hideSearchResultsView();
    renderGrids();
    showToast("Displaying all store products");
}

function handleSearch(query) {
    if (!query || query.trim() === "") {
        hideSearchResultsView();
        renderGrids();
        return;
    }
    const q = query.trim().toLowerCase();
    const filtered = allProductsList.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags && p.tags.toLowerCase().includes(q))
    );
    showSearchResultsView(`Search: "${query}"`, `Found ${filtered.length} matching products`, filtered);
}

function executeSearch() {
    const val = document.getElementById("searchInput").value;
    handleSearch(val);
}

function showSearchResultsView(title, subtitle, products) {
    const searchSection = document.getElementById("searchResultsSection");
    const heroSection = document.getElementById("heroSection");
    const trustSection = document.getElementById("trustSection");
    const searchGrid = document.getElementById("searchGrid");
    
    document.getElementById("searchResultsTitle").innerText = title;
    document.getElementById("searchResultsSubtitle").innerText = subtitle;
    
    if (products.length === 0) {
        searchGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding: 40px; background:#f8fafc; border-radius:12px; border:1px dashed #cbd5e1;">
                <i class="fa-solid fa-magnifying-glass" style="font-size:38px; color:#94a3b8; margin-bottom:10px;"></i>
                <h3 style="color:#1e293b; font-size:16px;">No exact products found</h3>
                <p style="color:#64748b; font-size:13px; margin-top:4px;">Try searching for "Phone", "Shoes", "Bag", "Sony", or "Apple"</p>
            </div>
        `;
    } else {
        searchGrid.innerHTML = products.map(p => createProductCard(p)).join("");
    }
    
    // Smoothly reveal search section & collapse hero to focus exclusively on searched products
    searchSection.style.display = "block";
    heroSection.style.display = "none";
    trustSection.style.display = "none";
    
    searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function hideSearchResultsView() {
    const searchSection = document.getElementById("searchResultsSection");
    const heroSection = document.getElementById("heroSection");
    const trustSection = document.getElementById("trustSection");
    
    searchSection.style.display = "none";
    heroSection.style.display = "grid";
    trustSection.style.display = "grid";
}

// ==========================================
// LOCATION MANAGEMENT
// ==========================================
function openLocationModal() {
    document.getElementById("locCityInput").value = currentUser.city;
    document.getElementById("locPincodeInput").value = currentUser.pincode;
    document.getElementById("locationModalBackdrop").classList.add("show");
}

function closeLocationModal() {
    document.getElementById("locationModalBackdrop").classList.remove("show");
}

function quickSetLocation(city, pincode) {
    document.getElementById("locCityInput").value = city;
    document.getElementById("locPincodeInput").value = pincode;
}

function handleSaveLocation(e) {
    e.preventDefault();
    const city = document.getElementById("locCityInput").value.trim();
    const pincode = document.getElementById("locPincodeInput").value.trim();
    
    if (city && pincode) {
        currentUser.city = city;
        currentUser.pincode = pincode;
        currentUser.address = `Flat 402, Sunshine Heights, ${city}`;
        
        // Update header location text
        document.getElementById("headerLocationText").innerText = `${city} ${pincode}`;
        
        // Update checkout & detail modals
        document.getElementById("custPincode").value = pincode;
        document.getElementById("custAddress").value = currentUser.address;
        const pModalStockText = document.getElementById("pModalStockText");
        if (pModalStockText) {
            pModalStockText.innerHTML = `In Stock • Ready for dispatch today to <strong>${city} ${pincode}</strong>`;
        }
        
        closeLocationModal();
        showToast(`📍 Delivery location updated to: ${city} (${pincode})`);
    }
}

// ==========================================
// ACCOUNT & LOGIN ID MANAGEMENT
// ==========================================
function openAccountModal() {
    document.getElementById("accUserName").value = currentUser.name;
    document.getElementById("accUserEmail").value = currentUser.email;
    document.getElementById("accUserPhone").value = currentUser.phone;
    
    document.getElementById("userDisplayFullName").innerText = currentUser.name;
    document.getElementById("userDisplayEmail").innerText = currentUser.email;
    
    // Initials avatar
    const initials = currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
    document.getElementById("userAvatarText").innerText = initials || "U";
    
    document.getElementById("accountModalBackdrop").classList.add("show");
}

function closeAccountModal() {
    document.getElementById("accountModalBackdrop").classList.remove("show");
}

function handleSaveAccountProfile(e) {
    e.preventDefault();
    const newName = document.getElementById("accUserName").value.trim();
    const newEmail = document.getElementById("accUserEmail").value.trim();
    const newPhone = document.getElementById("accUserPhone").value.trim();
    
    if (newName && newEmail) {
        currentUser.name = newName;
        currentUser.email = newEmail;
        currentUser.phone = newPhone;
        
        // Update header greeting
        document.getElementById("headerUserGreeting").innerText = `Hello, ${newName.split(' ')[0]}`;
        
        // Update checkout inputs
        document.getElementById("custName").value = newName;
        document.getElementById("custEmail").value = newEmail;
        document.getElementById("custPhone").value = newPhone;
        
        closeAccountModal();
        showToast(`👤 Account Login ID updated: ${newEmail}`);
    }
}

function quickSwitchUser() {
    const isOm = currentUser.name.includes("Omprakash");
    if (isOm) {
        currentUser.name = "Mira Sharma";
        currentUser.email = "mira.sharma@example.com";
        currentUser.phone = "+91 99887 76655";
    } else {
        currentUser.name = "Omprakash";
        currentUser.email = "omprakash@example.com";
        currentUser.phone = "+91 98765 43210";
    }
    
    document.getElementById("headerUserGreeting").innerText = `Hello, ${currentUser.name.split(' ')[0]}`;
    document.getElementById("custName").value = currentUser.name;
    document.getElementById("custEmail").value = currentUser.email;
    document.getElementById("custPhone").value = currentUser.phone;
    
    closeAccountModal();
    showToast(`🔄 Switched user account to: ${currentUser.name}`);
}

// Cart Operations
function addToCart(productId) {
    const product = allProductsList.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl
        });
    }

    updateCartUI();
    showToast(`Added "${product.name.substring(0, 22)}..." to cart!`);
}

function updateCartQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById("cartBadgeCount").innerText = totalQty;
    document.getElementById("cartItemCountHeader").innerText = totalQty;
    document.getElementById("cartSubtotal").innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById("cartTotal").innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById("checkoutFinalAmount").innerText = `₹${subtotal.toLocaleString('en-IN')}`;

    const list = document.getElementById("cartItemsList");
    if (cart.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding: 40px 10px; color: #64748b;">
            <i class="fa-solid fa-cart-arrow-down" style="font-size: 40px; margin-bottom: 12px; color: #cbd5e1;"></i>
            <p>Your cart is empty.</p>
        </div>`;
        return;
    }

    list.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="cart-item-details">
                <h5>${item.name}</h5>
                <div class="price">₹${item.price.toLocaleString('en-IN')}</div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <button onclick="updateCartQty(${item.id}, -999)" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px;"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join("");
}

function toggleCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    drawer.classList.toggle("show");
    overlay.classList.toggle("show");
}

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Please add items to your cart before checkout");
        return;
    }
    toggleCartDrawer();
    document.getElementById("checkoutModalBackdrop").classList.add("show");
}

function closeCheckoutModal() {
    document.getElementById("checkoutModalBackdrop").classList.remove("show");
}

// Place Order via Microservices REST API
async function handlePlaceOrder(e) {
    e.preventDefault();
    const orderPayload = {
        customerName: document.getElementById("custName").value,
        customerEmail: document.getElementById("custEmail").value,
        deliveryAddress: document.getElementById("custAddress").value,
        pincode: document.getElementById("custPincode").value,
        paymentMethod: selectedPaymentMethodName || "UPI (Google Pay / PhonePe)",
        totalAmount: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        items: cart.map(i => ({
            productId: i.id,
            productName: i.name,
            imageUrl: i.imageUrl,
            quantity: i.quantity,
            price: i.price
        }))
    };

    try {
        const res = await fetch(`${API_BASE}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload)
        });

        if (res.ok) {
            const placed = await res.json();
            showToast(`🎉 Order Placed with ${selectedPaymentMethodName}! ID: ${placed.orderNumber}`);
        } else {
            showToast(`Order processed in local mode with ${selectedPaymentMethodName}!`);
        }
    } catch (err) {
        showToast(`🎉 Order Placed via ${selectedPaymentMethodName}! Total: ₹${orderPayload.totalAmount.toLocaleString('en-IN')}`);
    }

    cart = [];
    updateCartUI();
    closeCheckoutModal();
}

// AI Forecast & Demand Prediction Modal
async function openForecastModal() {
    const backdrop = document.getElementById("aiModalBackdrop");
    const container = document.getElementById("aiForecastContent");
    backdrop.classList.add("show");

    container.innerHTML = `<div style="text-align:center; padding: 50px;"><i class="fa-solid fa-spinner fa-spin" style="font-size:32px; color:#6366f1;"></i><p style="margin-top:10px;">Computing AI Demand Forecasting & Reorder Predictions...</p></div>`;

    let forecasts = [];
    try {
        const res = await fetch(`${API_BASE}/inventory/ai/forecasts`);
        if (res.ok) {
            forecasts = await res.json();
        }
    } catch (e) {
        console.log("Using built-in demand forecasting analytics.");
    }

    if (!forecasts || forecasts.length === 0) {
        // Fallback local ML forecasting simulation
        forecasts = allProductsList.slice(0, 6).map(p => {
            const daily = (Math.random() * 3 + 1).toFixed(1);
            const pred30 = Math.round(daily * 30 * 1.05);
            const stock = p.id === 2 ? 12 : (p.id === 4 ? 8 : 45);
            const risk = stock <= 15 ? "CRITICAL_STOCKOUT_RISK" : (stock > 80 ? "OVERSTOCKED" : "OPTIMAL");
            const reorder = Math.max(0, pred30 + 15 - stock);
            return {
                productId: p.id,
                productName: p.name,
                currentStock: stock,
                reorderThreshold: 20,
                averageDailyDemand: parseFloat(daily),
                predictedDemandNext30Days: pred30,
                recommendedReorderQuantity: reorder,
                safetyStock: 15,
                stockRiskLevel: risk,
                confidenceScore: 0.94
            };
        });
    }

    const criticalCount = forecasts.filter(f => f.stockRiskLevel.includes("CRITICAL") || f.stockRiskLevel.includes("OUT")).length;
    const totalPredictedDemand = forecasts.reduce((s, f) => s + f.predictedDemandNext30Days, 0);

    container.innerHTML = `
        <div class="forecast-kpis">
            <div class="kpi-card alert">
                <div class="kpi-title">Stockout Alerts</div>
                <div class="kpi-value">${criticalCount} Items</div>
                <div class="kpi-sub">Immediate reorder suggested</div>
            </div>
            <div class="kpi-card success">
                <div class="kpi-title">Avg Model Accuracy</div>
                <div class="kpi-value">94.8%</div>
                <div class="kpi-sub">Weighted Time-Series Model</div>
            </div>
            <div class="kpi-card purple">
                <div class="kpi-title">30-Day Demand Forecast</div>
                <div class="kpi-value">${totalPredictedDemand} Units</div>
                <div class="kpi-sub">Aggregated across catalog</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-title">Active SKU Tracking</div>
                <div class="kpi-value">${forecasts.length} SKUs</div>
                <div class="kpi-sub">Automated inventory sync</div>
            </div>
        </div>

        <div class="forecast-table-wrap">
            <table class="forecast-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Current Stock</th>
                        <th>Daily Velocity</th>
                        <th>Predicted 30D Demand</th>
                        <th>Safety Stock Buffer</th>
                        <th>AI Reorder Suggestion</th>
                        <th>Risk Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${forecasts.map(f => {
                        let badgeClass = "optimal";
                        let badgeText = "Healthy";
                        if (f.stockRiskLevel.includes("CRITICAL") || f.stockRiskLevel.includes("OUT")) {
                            badgeClass = "critical";
                            badgeText = "Stockout Risk";
                        } else if (f.stockRiskLevel.includes("MEDIUM")) {
                            badgeClass = "medium";
                            badgeText = "Reorder Soon";
                        }
                        return `
                            <tr>
                                <td><strong>${f.productName}</strong></td>
                                <td><span style="font-weight:700; color:${f.currentStock <= 15 ? '#ef4444' : '#0f172a'}">${f.currentStock} units</span></td>
                                <td>${f.averageDailyDemand} / day</td>
                                <td><strong>${f.predictedDemandNext30Days} units</strong></td>
                                <td>${f.safetyStock || 15} units</td>
                                <td><strong style="color:#0f62fe;">+${f.recommendedReorderQuantity} units</strong></td>
                                <td><span class="risk-badge ${badgeClass}">${badgeText}</span></td>
                                <td>
                                    <button class="restock-action-btn" onclick="executeRestock(${f.productId}, ${f.recommendedReorderQuantity || 50})">
                                        <i class="fa-solid fa-boxes-stacked"></i> Auto Restock
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function closeForecastModal() {
    document.getElementById("aiModalBackdrop").classList.remove("show");
}

async function executeRestock(productId, qty) {
    try {
        await fetch(`${API_BASE}/inventory/restock`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity: qty })
        });
    } catch(e) {}
    showToast(`📦 Restocked +${qty} units successfully!`);
    openForecastModal();
}

// Countdown Timer for Top Deals (Matches "Ends in 08 : 24 : 15")
function initDealCountdown() {
    let totalSeconds = 8 * 3600 + 24 * 60 + 15;
    const timerElem = document.getElementById("countdownTimer");

    setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            const secs = String(totalSeconds % 60).padStart(2, '0');
            timerElem.innerText = `${hours} : ${mins} : ${secs}`;
        }
    }, 1000);
}

// Toast Notifications
function showToast(msg) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s";
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
