FROM reactnativecommunity/react-native-android

WORKDIR /usr/share/app/mobile-owner

COPY package.json .

RUN npm install

EXPOSE 4441

COPY .  .

COPY mobile-owner-setup.sh /usr/local/bin/mobile-owner-setup.sh

RUN chmod +x /usr/local/bin/mobile-owner-setup.sh

CMD /usr/local/bin/mobile-owner-setup.sh