  import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.DATABASE as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  GOOGLE_CLOUD_ID: process.env.GOOGLE_CLOUD_ID as string,
  GOOGLE_KEY_SECRET: process.env.GOOGLE_KEY_SECRET as string,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID as string,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN as string,
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID as string,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string
};

export default configKeys;