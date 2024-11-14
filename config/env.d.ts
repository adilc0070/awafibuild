interface EnvConfig {
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    PAYMENT_GATEWAY: string;
    STRIPE_SECRET_KEY: string;
    Atlas_Url: string;
    Base_Url: string;
    RAZORPAY_SECRET_KEY: string;
<<<<<<< HEAD
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    PORT: string;
    Frontend_URL: string;
    RAZORPAY_KEY_ID: string;
    STRIPE_PUBLIC_KEY: string;
=======
>>>>>>> 3f0d285c423d74a24467632dd2d0f0e4184ac3e5
}
declare const envConfig: EnvConfig;
export default envConfig;
