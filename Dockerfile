FROM node:16-alpine

WORKDIR /data

COPY ./*.json /data/

COPY ./prisma /data/

COPY ./.env /data/

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait

RUN chmod +x /wait

RUN npm install --quiet

COPY . . 

EXPOSE 3001

CMD ["npm", "run", "dev"]