# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /src
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
# FIX 1: Copy files to Nginx's default public directory
COPY --from=builder /src/dist /usr/share/nginx/html
# FIX 2: Expose 80 because standard Nginx alpine defaults to port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
