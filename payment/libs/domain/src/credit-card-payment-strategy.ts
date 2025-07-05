import { IPaymentStrategy } from "./ipayment-strategy.interface";
export class CreditCardPaymentStrategy implements IPaymentStrategy {
    public Pay(amount: number): boolean
    {
        console.info("Customer pays Rs " + amount + " using Credit Card");
        return true;
    }    
}