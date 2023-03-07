import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const PORTSWAGGER = process.env.PORTSWAGGER || 5000;