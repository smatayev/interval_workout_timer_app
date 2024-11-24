# Step 1: Use an official Node.js runtime as a base image
FROM node:16 as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files into container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React application for production
RUN npm run build

# Step 7: Use lightweight NGINX server to serve the production build
FROM nginx:alpine

# Step 8: Copy the Reast build output to NGINX's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port the app runs on
EXPOSE 80

# Step 10: Set the command to run the application
CMD ["nginx", "-g", "daemon off;"]docker