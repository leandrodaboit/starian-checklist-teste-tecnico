FROM node:20-alpine

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200

ENV NG_CLI_ANALYTICS=false
ENV NODE_OPTIONS=--max_old_space_size=4096

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "1000", "--disable-host-check"]
