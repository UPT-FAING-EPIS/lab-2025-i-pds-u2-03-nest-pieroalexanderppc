import { Test, TestingModule } from '@nestjs/testing';
import { DomainService } from './domain.service';
import { Account } from './account';
import { WithdrawCommand } from './withdraw-command';
import { DepositCommand } from './deposit-command';
import { ATM } from './atm';

describe('DomainService', () => {
  let service: DomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainService],
    }).compile();

    service = module.get<DomainService>(DomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('GivenAccountAndWithdraw_ThenExecute_ReturnsCorrectAmount', () => {
  let account: Account;

  beforeEach(async () => {
    account = new Account();
    account.AccountBalance = 300;  // Establece el saldo inicial
    const amount = 100;  // Monto a retirar
    const withdraw = new WithdrawCommand(account, amount);  // Crea el comando de retiro
    new ATM(withdraw).Action();  // Ejecuta el comando de retiro
  });

  it('should be 200', () => {
    expect(account.AccountBalance).toBe(200);  // Verifica que el saldo sea 200 después del retiro
  });
});

describe('GivenAccountAndDeposit_ThenExecute_ReturnsCorrectAmount', () => {
  let account: Account;

  beforeEach(async () => {
    account = new Account();
    account.AccountBalance = 200;  // Establece el saldo inicial
    const amount = 100;  // Monto a depositar
    const deposit = new DepositCommand(account, amount);  // Crea el comando de depósito
    new ATM(deposit).Action();  // Ejecuta el comando de depósito
  });

  it('should be 300', () => {
    expect(account.AccountBalance).toBe(300);  // Verifica que el saldo sea 300 después del depósito
  });
});
