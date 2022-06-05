# ====================================================
# Build Stage
#
FROM node:16-alpine as build
WORKDIR /build

# Copy registry authentication and package definitions
COPY .env /build/
COPY package.json pnpm-lock.yaml /build/

# Install dependencies
RUN npm i -g pnpm 
RUN pnpm i --frozen-lockfile --ignore-scripts

# Copy source code and build application
COPY . /build
RUN pnpm build

# ====================================================
# Application Stage
#
FROM node:16-alpine as app
WORKDIR /app
EXPOSE 8080

# Copy built application
COPY --from=build /build/dist /app

# Install production dependencies
RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile --prod --ignore-scripts

# Run application
CMD [ "pnpm", "start" ]