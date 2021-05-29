# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm config set unsafe-perm true
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build



# production environment
FROM nginx:1.16.0-alpine

# nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# static build
COPY --from=build /app/build /usr/share/nginx/html

# expose port
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]






# # production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:10
# # Create app directory
# WORKDIR /usr/src/app
# # Install app dependencies
# COPY package*.json ./

# RUN npm install --silent
# # Copy app source code
# COPY . .

# #Expose port and start application
# EXPOSE 3000
# CMD ["npm", "start"]