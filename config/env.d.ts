interface EnvConfig {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    PAYMENT_GATEWAY: string;
    STRIPE_SECRET_KEY: string;
    Atlas_Url: string;
}
declare const envConfig: EnvConfig;
export default envConfig;
