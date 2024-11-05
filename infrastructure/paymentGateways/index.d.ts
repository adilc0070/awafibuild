import { RazorpayGateway } from './RazorpayGateway';
import { StripeGateway } from './StripeGateway';
declare const paymentGateway: RazorpayGateway | StripeGateway;
export default paymentGateway;
