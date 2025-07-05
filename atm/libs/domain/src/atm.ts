import { ICommand } from './icommand.interface';

export class ATM {
  _command: ICommand;
  constructor(command: ICommand) {
    this._command = command;
  }
  public Action(): void {
    this._command.Execute();
  }
}