FROM node:14.17.2-buster 

WORKDIR /app

# Copy all files
COPY . .

# Install Package 
RUN yarn 

RUN yarn build

# Open Port 
EXPOSE 8080

RUN pwd

# Running Backend 
# CMD [ "/bin/sh", "-c", "yarn prisma generate && yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts && yarn run prod"]
CMD [ "/bin/sh", "-c", "yarn build && yarn prod"]
