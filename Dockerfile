FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY index.js ./
COPY worker worker/
COPY public public/
CMD npm run start