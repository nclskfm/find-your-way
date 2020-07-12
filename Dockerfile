# use node to build the app
FROM node:10.20.1-alpine AS build

#set working directory
WORKDIR /build

# copy source code to the working directory
COPY . .

# install all node packages defined in package.json
RUN npm ci

# build the app
RUN npm run build:prod

# use nginx to serve the app
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy compiled source code to the nginx directory
COPY --from=build /build/dist/find-your-way /usr/share/nginx/html

#########################################################
#                                                       #
# $ docker build -t cooking-monkey-frontend .           #
#                                                       #
# $ docker run -it -p 80:80 cooking-monkey-frontend     #
#                                                       #
#########################################################