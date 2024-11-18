FROM node:14

# Definimos el directorio de trabajo en el contenedor
WORKDIR /app

COPY . .
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start"]
