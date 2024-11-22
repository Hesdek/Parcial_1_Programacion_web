FROM node:14

WORKDIR /app
COPY ./api/package*.json ./  
COPY ./server.js ./ 
COPY ./api ./api
RUN npm install
EXPOSE 3000

CMD ["node", "server.js"]
