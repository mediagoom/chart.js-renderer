#docker build -t chartjs .
#docker run --rm -it --name my_chartjs -p 3000:3000 -v /home/guacamole/DATA:/DATA chartjs api -d /DATA/alpha --mounted /DATA --data-dir /DATA

# Use an official Node.js 22.20.0 image
FROM node:22.20.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i --legacy-peer-deps;cd build/module; npm i; cd -;npm run build 

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

RUN mkdir -p /DATA

# Expose the application port
EXPOSE 3000

ENTRYPOINT ["node", "index.js"]

# Start the application
#CMD []