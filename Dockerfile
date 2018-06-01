FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .env ./
COPY index.js ./
COPY worker worker/
CMD ["npm", "start"]