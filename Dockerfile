# Use alpine LTS Node.js image
FROM node:16-alpine
EXPOSE 8080

# Copy registry authentication and package definitions
WORKDIR /app
COPY .env /app/
COPY package.json pnpm-lock.yaml /app/

# Install dependencies
RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile --prod

# Copy source code and execute application
COPY . /app
CMD ["pnpm", "start"]