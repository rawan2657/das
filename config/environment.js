const environment = {
  nodeEnv: import.meta.env.MODE,
  baseUrl:
    import.meta.env.VITE_BASE_URL || "https://e-commerce-api-3wara.vercel.app",
};

environment.isProduction = import.meta.env.PROD;
environment.isDevelopment = import.meta.env.DEV;

export default Object.freeze(environment);
