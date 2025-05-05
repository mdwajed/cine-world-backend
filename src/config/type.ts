interface JwtConfig {
  jwt_secret: string;
  expires_in: string;
  refresh_token_secret: string;
  refresh_token_expires_in: string;
  reset_pass_token_secret: string;
  reset_pass_token_expires_in: string;
}

interface EmailSenderConfig {
  email: string;
  app_pass: string;
}

export interface AppConfig {
  env: string;
  port: string;
  jwt: JwtConfig;
  reset_pass_url: string;
  emailSender: EmailSenderConfig;
}
