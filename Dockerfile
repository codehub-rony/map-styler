# Use Node.js LTS (not Alpine, to avoid memory issues)
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the Vue app
RUN npm run build

# Install Express server
RUN npm install express

# Expose the correct port
EXPOSE 3000

# Run the Express server
CMD ["node", "server.js"]