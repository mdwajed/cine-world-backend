import dotenv from "dotenv";

import path from "path";
import { AppConfig } from "./type";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const config: AppConfig = {
  env: process.env.NODE_ENV!,
  port: process.env.PORT!,
  jwt: {
    jwt_secret: process.env.JWT_SECRET!,
    expires_in: process.env.EXPIRES_IN as string,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET!,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    reset_pass_token_secret: process.env.RESET_PASS_TOKEN_SECRET!,
    reset_pass_token_expires_in: process.env
      .RESET_PASS_TOKEN_EXPIRES_IN as string,
  },
  reset_pass_url: process.env.RESET_PASS_URL!,
  emailSender: {
    email: process.env.EMAIL!,
    app_pass: process.env.APP_PASS!,
  },
};
export default config;
