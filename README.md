# 🛍️ ShopSmart AI - AI-Powered Microservices E-Commerce Platform

An enterprise-grade, **AI-powered microservices-based e-commerce platform** engineered with **Java, Spring Boot, Spring Data JPA, Hibernate, MySQL, and Docker/Kubernetes**, featuring real-time **AI demand forecasting, inventory prediction, and stockout prevention**.

---

## 🌟 Key Highlights & Engineering Features

- **Microservices Backend Architecture**:
  - **API Gateway Service (`:8080`)**: Centralized routing, request interception, error transformation, and CORS management.
  - **Product Service (`:8081`)**: Complete catalog lifecycle, multi-attribute category filtering, search, pricing models, and top-deal categorization.
  - **Order Service (`:8082`)**: Transactional checkout pipeline, atomic stock update coordination, order lifecycle tracking.
  - **Inventory & AI Demand Forecasting Service (`:8083`)**:
    - Real-time stock reservation, safety buffer calculations ($Z=1.65$ for 95% service level confidence).
    - **AI Demand Prediction Module**: Analyzes 30-day historical time-series sales velocity, day-of-week seasonality, and trend projection to forecast next-month demand and auto-recommend reorder quantities.
- **Pixel-Perfect Frontend UI**:
  - Exact layout reproduction matching the target screenshot.
  - Responsive Top Navigation with real-time category selector, search bar, pincode locator, account badge, and active cart counter.
  - Sticky Category Sidebar navigation with deep-filtering.
  - Hero Slider with iPhone 15 hero showcase and promotional callouts.
  - Live Deal Countdown Timer (`Ends in 08:24:15`).
  - Shop by Category Pill Cards & AI-Recommended Product Section.
  - Live **AI Demand & Inventory Optimizer Modal Dashboard** with one-click automated restock triggers.
- **Containerization & Cloud Native Orchestration**:
  - Multi-stage `Dockerfile` minimizing footprint.
  - Full-stack `docker-compose.yml` for unified local deployment.
  - Production-ready `k8s/deployments.yaml` specifying `Deployments`, `Services`, and LoadBalancers.

---

## 📁 Repository Structure

```text
├── pom.xml                               # Maven Multi-Module Root POM
├── backend/
│   ├── api-gateway/                      # Spring Boot Gateway (:8080)
│   ├── product-service/                  # Product Catalog & Search (:8081)
│   ├── order-service/                    # Order Management & Coordination (:8082)
│   └── inventory-service/                # Inventory Tracking & AI Demand Engine (:8083)
├── frontend/
│   ├── index.html                        # Semantic HTML5 matching UI design
│   ├── styles.css                        # Modern CSS Design System & Layouts
│   └── app.js                            # Interactive Client & API Integration
├── k8s/
│   └── deployments.yaml                  # Kubernetes Deployments & Services
├── Dockerfile                            # Multi-stage container build
└── docker-compose.yml                    # Local multi-service orchestration
```

---

## 🚀 Running the Project Locally

### 1. Compile & Test Backend Microservices
```bash
# From workspace root
mvn clean test
```

### 2. Run Individual Services
```bash
# Terminal 1 - Product Service
mvn spring-boot:run -pl backend/product-service

# Terminal 2 - Order Service
mvn spring-boot:run -pl backend/order-service

# Terminal 3 - Inventory & AI Service
mvn spring-boot:run -pl backend/inventory-service

# Terminal 4 - API Gateway
mvn spring-boot:run -pl backend/api-gateway
```

### 3. Open Frontend UI
Simply open `frontend/index.html` in any browser or serve via:
```bash
python3 -m http.server 3000 --directory frontend
```
Then visit `http://localhost:3000`.

### 4. Running with Docker Compose
```bash
docker-compose up --build
```
