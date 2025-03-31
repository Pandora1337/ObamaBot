FROM  node:16-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y -q libfontconfig1

COPY . .

VOLUME [ "/app/logs" ]

CMD ["npm", "start"]