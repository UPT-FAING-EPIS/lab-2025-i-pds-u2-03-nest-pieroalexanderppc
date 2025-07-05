export class Account {
  public MAX_INPUT_AMOUNT: number = 10000;
  public AccountNumber: number;
  public AccountBalance: number;

  public Withdraw(amount: number): void {
    if (amount > this.AccountBalance)
      throw new Error('The input amount is greater than balance.');
    this.AccountBalance -= amount;
  }
  public Deposit(amount: number): void {
    if (amount > this.MAX_INPUT_AMOUNT)
      throw new Error('The input amount is greater than maximum allowed.');
    this.AccountBalance += amount;
  }
}