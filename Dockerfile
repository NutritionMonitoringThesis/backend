FROM node:14.17.2-buster 

WORKDIR /app/
# Copy all files
COPY . .

# Install Package 
RUN yarn 

RUN yarn run build

# Open Port 
EXPOSE 8080

# Running Backend 
CMD [ "/bin/sh", "-c", "yarn run prod"]
