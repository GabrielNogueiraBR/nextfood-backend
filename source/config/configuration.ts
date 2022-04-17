export default () => ({
  app: {
    port: Number.parseInt(process.env.PORT, 10) || 8080,
  },
});
