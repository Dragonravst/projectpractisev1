# Use Node.js 16 Alpine for a smaller image
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3030

# Start the app
CMD ["npm", "start"]