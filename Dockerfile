FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight static file server
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist /app

# Expose port 3000 (Coolify will map this)
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "/app", "-l", "3000"]