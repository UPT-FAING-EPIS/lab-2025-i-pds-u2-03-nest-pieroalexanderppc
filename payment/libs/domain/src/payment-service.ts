import { CashPaymentStrategy } from "./cash-payment-strategy";
import { CreditCardPaymentStrategy } from "./credit-card-payment-strategy";
import { DebitCardPaymentStrategy } from "./debit-card-payment-strategy";
import { PaymentContext } from "./payment-context";
export class PaymentService {
    public ProcessPayment(SelectedPaymentType: number, Amount: number): boolean
    {
        //Create an Instance of the PaymentContext class
        const context = new PaymentContext();
        if (SelectedPaymentType == PaymentType.CreditCard)
        {
            context.SetPaymentStrategy(new CreditCardPaymentStrategy());
        }
        else if (SelectedPaymentType == PaymentType.DebitCard)
        {
            context.SetPaymentStrategy(new DebitCardPaymentStrategy());
        }
        else if (SelectedPaymentType == PaymentType.Cash)
        {
            context.SetPaymentStrategy(new CashPaymentStrategy());
        }
        else
        {
            throw new Error("You Select an Invalid Payment Option");
        }
        //Finally, call the Pay Method
        return context.Pay(Amount);;
    }    
}

export enum PaymentType
{
    CreditCard = 1,  // 1 for CreditCard
    DebitCard = 2,   // 2 for DebitCard
    Cash = 3, // 3 for Cash
}