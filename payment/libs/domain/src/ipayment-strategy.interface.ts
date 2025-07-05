export interface IPaymentStrategy {
    Pay(amount: number): boolean;
}