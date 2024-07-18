declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    MONGO_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRE: string;
    GMAIL_PASS: string;
    GEMAIL: string;
    // Add other environment variables here
  }
}
