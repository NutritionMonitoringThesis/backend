FROM node:14.17.2-buster 

WORKDIR /app/
# Copy all files
COPY . .

# Install Package 
RUN yarn 

# Open Port 
EXPOSE 8080

# Running Backend 
CMD [ "/bin/sh", "-c", "yarn && yarn prisma generate && yarn run prisma migrate deploy && yarn run ts-node ./prisma/seed.ts && yarn run dev"]
