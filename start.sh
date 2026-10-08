#!/bin/bash

echo "🚀 Starting ShopSmart AI Microservices & Frontend..."

# Kill any existing processes on the target ports
kill -9 $(lsof -t -i:8080 -i:8081 -i:8082 -i:8083 -i:3000) 2>/dev/null || true

# Package JARs if not already packaged
if [ ! -f backend/product-service/target/product-service-1.0.0-SNAPSHOT.jar ] || \
   [ ! -f backend/order-service/target/order-service-1.0.0-SNAPSHOT.jar ] || \
   [ ! -f backend/inventory-service/target/inventory-service-1.0.0-SNAPSHOT.jar ] || \
   [ ! -f backend/api-gateway/target/api-gateway-1.0.0-SNAPSHOT.jar ]; then
    echo "📦 Packaging JARs..."
    mvn package -DskipTests
fi

# Start Microservices in background with logs
echo "Starting Product Service on :8081..."
nohup java -jar backend/product-service/target/product-service-1.0.0-SNAPSHOT.jar > product.log 2>&1 &

echo "Starting Order Service on :8082..."
nohup java -jar backend/order-service/target/order-service-1.0.0-SNAPSHOT.jar > order.log 2>&1 &

echo "Starting Inventory & AI Service on :8083..."
nohup java -jar backend/inventory-service/target/inventory-service-1.0.0-SNAPSHOT.jar > inventory.log 2>&1 &

echo "Starting API Gateway on :8080..."
nohup java -jar backend/api-gateway/target/api-gateway-1.0.0-SNAPSHOT.jar > gateway.log 2>&1 &

echo "Starting Frontend on :3000..."
nohup python3 -m http.server 3000 --directory frontend > frontend.log 2>&1 &

echo "Waiting for services to warm up..."
sleep 7

echo "Checking running ports:"
lsof -nP -iTCP:8080,8081,8082,8083,3000

echo ""
echo "✅ All services running! Open http://localhost:3000 in your browser."
