import { IPaymentStrategy } from "./ipayment-strategy.interface";
export class DebitCardPaymentStrategy implements IPaymentStrategy {
    public Pay(amount: number): boolean {
        console.info("Customer pays Rs " + amount + " using Debit Card");
        return true;
    }
}