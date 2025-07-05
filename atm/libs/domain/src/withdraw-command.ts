import { Account } from './account';
import { ICommand } from './icommand.interface';

export class WithdrawCommand implements ICommand {
  _account: Account;
  _amount: number;

  constructor(account: Account, amount: number) {
    this._account = account;
    this._amount = amount;
  }
  Execute(): void {
    this._account.Withdraw(this._amount);
  }
}