export interface IEmailServices {
    OtpEmail(email: string, otp: string): Promise<void>;
}
declare class EmailService implements IEmailServices {
    private transporter;
    constructor();
    OtpEmail(email: string, otp: string): Promise<void>;
}
export default EmailService;
