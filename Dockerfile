# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["yarn", "start", "dev"]
