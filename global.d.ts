export namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URL: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_EXPIRE: string;
    GMAIL_PASS: string;
    GMAIL: string;
  }
}
