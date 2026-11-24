FROM node:24-alpine

WORKDIR /usr/src/app

# Instalar dependencias
COPY package*.json pnpm-lock.yaml* ./
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 8001

CMD ["npm", "start"]
