FROM node:latest
RUN apt-get update && \
  apt-get install -y libgtk2.0-0 libgtk-3-0 libnotify-dev \
  libgconf-2-4 libnss3 libxss1 \
  libasound2 libxtst6 xauth xvfb \
  libgbm-dev
COPY ./package*.json .
COPY . .
RUN npm i -g npm && npm i -g --force yarn
RUN yarn install
EXPOSE 3000

CMD [ "yarn", "prod" ]