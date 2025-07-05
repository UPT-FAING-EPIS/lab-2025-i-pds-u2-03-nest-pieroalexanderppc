import { IPaymentStrategy } from "./ipayment-strategy.interface";
export class CashPaymentStrategy implements IPaymentStrategy {
    public Pay(amount: number): boolean {
        console.info("Customer pays Rs " + amount + " By Cash");
        return true;
    }
}