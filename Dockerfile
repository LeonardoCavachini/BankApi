FROM node:16-alpine

WORKDIR /banckAPi

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --quiet

RUN npm run prisma

RUN npm run prismaT

COPY . . 

EXPOSE 3001

CMD ["npm", "run", "dev"]
