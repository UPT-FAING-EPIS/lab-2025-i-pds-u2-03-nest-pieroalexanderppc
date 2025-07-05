import { IPaymentStrategy } from "./ipayment-strategy.interface";
export class PaymentContext {
        // The Context has a reference to the Strategy object.
        // The Context does not know the concrete class of a strategy. 
        // It should work with all strategies via the Strategy interface.
        private PaymentStrategy: IPaymentStrategy;
        // The Client will set what PaymentStrategy to use by calling this method at runtime
        public SetPaymentStrategy(strategy: IPaymentStrategy): void
        {
            this.PaymentStrategy = strategy;
        }
        // The Context delegates the work to the Strategy object instead of
        // implementing multiple versions of the algorithm on its own.
        public Pay(amount: number): boolean
        {
            return this.PaymentStrategy.Pay(amount);
        }    
}