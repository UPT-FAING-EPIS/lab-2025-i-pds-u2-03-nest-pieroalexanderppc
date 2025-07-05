[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/s4UzwOOQ)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19560866)
# SESION DE LABORATORIO N° 03: PATRONES DE DISEÑO DE COMPORTAMIENTO
Nombre: Piero Alexander Paja De la Cruz
## OBJETIVOS
  * Comprender el funcionamiento de algunos patrones de diseño de software del tipo de comportamiento.

## REQUERIMIENTOS
  * Conocimientos: 
    - Conocimientos básicos de Bash (powershell).
    - Conocimientos básicos de C# y Visual Studio Code.
  * Hardware:
    - Al menos 4GB de RAM.
  * Software:
    - Windows 10 64bit: Pro, Enterprise o Education (1607 Anniversary Update, Build 14393 o Superior)
    - Docker Desktop 
    - Powershell versión 7.x
    - Node LTS o superior
    - Visual Studio Code

## CONSIDERACIONES INICIALES
  * Clonar el repositorio mediante git para tener los recursos necesarios

## DESARROLLO

### PARTE I: Strategy Design Pattern 

![image](https://github.com/UPT-FAING-EPIS/SI889_PDS/assets/10199939/21cf440e-8156-498c-afd7-95c066ffaa93)
En la imagen Steve compra un monitor y una lavadora, pero a la hora de acercarse a la ventanilla existen tres formas de pagar: Tarjeta de Crédito, Tarjeta de Débito y Efectivo.

1. Iniciar la aplicación Powershell o Windows Terminal en modo administrador 
2. En el terminal, Ejecutar el siguiente comando para crear una nueva solución
```Bash
nest new Payment -p npm -g
```
![image](https://github.com/user-attachments/assets/123d44d9-4a93-4c3f-8be3-9670b8de9829)
![image](https://github.com/user-attachments/assets/983baada-8f2d-4b62-8149-72a6623d6772)

3. En el terminal, acceder a la solución creada y ejecutar el siguiente comando para crear una nueva libreria de clases y adicionarla a la solución actual.
```Bash
cd Payment
nest g lib domain
```
![image](https://github.com/user-attachments/assets/e621eb5b-5f64-478f-ae51-3ff989d1fcb8)

4. En el terminal, ejecutar el siguiente comando para crear un nuevo proyecto de pruebas y adicionarla a la solución actual
```Bash
nest g itf IPaymentStrategy -p domain --flat --no-spec
nest g cl CreditCardPaymentStrategy -p domain --flat --no-spec
nest g cl DebitCardPaymentStrategy -p domain --flat --no-spec
nest g cl CashPaymentStrategy -p domain --flat --no-spec
nest g cl PaymentContext -p domain --flat --no-spec
nest g cl PaymentService -p domain --flat --no-spec
```
![image](https://github.com/user-attachments/assets/353240d0-6b03-4484-856d-cc087357aea1)

5. Iniciar Visual Studio Code (VS Code) abriendo el folder de la solución como proyecto. En el proyecto Payment, si existe un archivo app.controller.spec.ts proceder a eliminarlo.
![image](https://github.com/user-attachments/assets/3964426a-779c-4816-bfd8-23eafc264809)
![image](https://github.com/user-attachments/assets/fbc2506e-3cb4-4dfd-8829-796e27121384)

6. En el VS Code, primero se necesita implementar la interfaz que servirá de ESTRATEGIA base para las posibles implementaciones de pagos, en el proyecto Notifications.Domain proceder a modificar el archivo ipayment-strategy.interface.ts:
```TS
export interface IPaymentStrategy {
    Pay(amount: number): boolean;
}
```
![image](https://github.com/user-attachments/assets/41418b91-7646-486b-98c8-788286150bfa)

7. En el VS Code, ahora proceder a implementar las clases concretas o implementaciones a partir de la interfaz creada, Para esto en el proyecto Payment.Domain proceder a modificar los archivos siguientes:
> credit-card-payment-strategy.ts
```TS
import { IPaymentStrategy } from "./ipayment-strategy.interface";
export class CreditCardPaymentStrategy implements IPaymentStrategy {
    public Pay(amount: number): boolean
    {
        console.info("Customer pays Rs " + amount + " using Credit Card");
        return true;
    }    
}
```
![image](https://github.com/user-attachments/assets/4fa2c679-7ec7-4332-b8b3-0464d824f694)

> debit-card-payment-strategy.ts
```TS
import { IPaymentStrategy } from "./ipayment-strategy.interface";
export class DebitCardPaymentStrategy implements IPaymentStrategy {
    public Pay(amount: number): boolean {
        console.info("Customer pays Rs " + amount + " using Debit Card");
        return true;
    }
}
```
![image](https://github.com/user-attachments/assets/3d6a4bbe-ed4a-4238-a34d-ab0038844680)

> cash-payment-strategy.ts
```TS
import { IPaymentStrategy } from "./ipayment-strategy.interface";
export class CashPaymentStrategy implements IPaymentStrategy {
    public Pay(amount: number): boolean {
        console.info("Customer pays Rs " + amount + " By Cash");
        return true;
    }
}
```
![image](https://github.com/user-attachments/assets/1cf415ca-b0d9-449d-872a-5b785c7f8c9a)

8. En el VS Code, seguidamente crear la clase que funcionara de contexto y permitira la ejecución de cualquier estrategia, por lo que en el proyecto de Payment.Domain se debe modificar el archivo payment-context.ts con el siguiente código:
```TS
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
```
![image](https://github.com/user-attachments/assets/71d4de8c-8618-4ad7-badc-c3e253e1e294)

9. En el VS Code, adicionalmente para facilitar la utilización de las diferentes estrategias adicionaremos una fachada, para eso modificar el archivo payment-service.ts en el proyecto Payment.Domain:
```TS
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
```
![image](https://github.com/user-attachments/assets/6dda67a4-1bd2-49b2-8b3e-f5859aa26b47)

10. En el VS Code, ahora proceder a implementar unas pruebas para verificar el correcto funcionamiento de la aplicación. Para esto al proyecto Payment.Domain modificar el archivo domain.service.spec.ts y agregar el siguiente código:
```TS
import { PaymentService } from './payment-service';
describe('GivenAValidPaymentTypeAndAmount_WhenProcessPayment_ResultIsSuccesful', () => {
  type TestCase = [paymentType: number, amount: number];
  it.each<TestCase>([
    [1, 1000],
    [2, 2000],
    [3, 3000],
  ])('Payment type %i and amount %i should be true', (paymentType, amount) => {
    expect(new PaymentService().ProcessPayment(paymentType, amount)).toBeTruthy();
  });
});
describe('GivenAnUnknownPaymentTypeAndAmount_WhenProcessPayment_ResultIsError', () => {
  type TestCase = [paymentType: number, amount: number];
  it.each<TestCase>([
    [4, 4000],
  ])('Payment type %i and amount %i should be error', (paymentType, amount) => {
    expect(() => {new PaymentService().ProcessPayment(paymentType, amount)}).toThrow("You Select an Invalid Payment Option");
  });
});
```
![image](https://github.com/user-attachments/assets/7b03a297-2bae-4b8e-97c3-50e0bc61b3b9)

11. Ahora necesitamos comprobar las pruebas contruidas para eso abrir un terminal en VS Code (CTRL + Ñ) o vuelva al terminal anteriormente abierto, y ejecutar los comandos:
```Bash
npm run test:cov
```
![image](https://github.com/user-attachments/assets/1c197e3a-b4c1-4b6c-a8a0-1abdd695d47f)

12. Si las pruebas se ejecutaron correctamente debera aparcer un resultado similar al siguiente:
```Bash
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```
![image](https://github.com/user-attachments/assets/183a2a35-190c-4729-a063-e005d7f19560)

13. Finalmente se puede apreciar que existen tres componentes principales en el patrón ESTARTEGIA:
a. Estrategia: declarada en una interfac para ser implementada para todos los algoritmos soportado
b. EstrategiaConcreta: Es la implementa la estrategia para cada algoritmo
c. Conexto: esta es la clase que mantiene la referencia al objeto Estrategia y luego utiliza la referencia para llamar al algoritmo definido por cada EstrtaegiaConcreta

![image](https://github.com/UPT-FAING-EPIS/SI889_PDS/assets/10199939/e132b3dd-1b5d-4cdf-a91d-fe114071c4bb)

14. En el terminal, ejecutar el siguiente comando para generar el diagrama de clases respectivo
```Bash
tsuml2 --glob "./libs/**/*.ts" --outMermaidDsl "./class_diagram.md"
```
![image](https://github.com/user-attachments/assets/62de8a74-86ea-4499-9962-a4de2f6caded)

15. En el VS Code, modificar el archivo class_diagram.md y adicionar \```mermaid al inicio del archivo y al final adicionar \```
![image](https://github.com/user-attachments/assets/bdb3270d-50b2-47b2-9d10-4d0183bebf01)
![image](https://github.com/user-attachments/assets/d0ffcc78-6dea-4fd7-b309-9e1d1cd9bf9b)

16. En el terminal, ejecutar el siguiente comando para generar la documentación del proyecto, esta se creara en la carpeta documentation
```Bash
npx @compodoc/compodoc -p tsconfig.json -s
```
![image](https://github.com/user-attachments/assets/1a6c5f6b-779b-43c5-af48-390f9e04a504)
![image](https://github.com/user-attachments/assets/bbc66502-6a5b-4e8b-b075-4e229ab7696c)

![image](https://github.com/user-attachments/assets/94690ce1-54a2-4ddc-b44a-ad477a12a681)


### PARTE II: Command Design Pattern

1. Iniciar una nueva instancia de la aplicación Powershell o Windows Terminal en modo administrador 
![image](https://github.com/user-attachments/assets/079de8d3-9f03-47fe-af41-4ad74a93b2b1)

2. Ejecutar el siguiente comando para crear una nueva aplicación
```
nest new ATM -p npm -g
```
![image](https://github.com/user-attachments/assets/fbd0df05-0cd7-46f1-9cc6-d959ca558608)
![image](https://github.com/user-attachments/assets/79b240a3-6259-426b-9569-06802fedfbec)

3. En el terminal, ejecutar los siguientes comandos para acceder a la carpeta del proyecto y crear una nueva libreria de clases y adicionarla a la aplicación actual.
```
cd ATM
nest g lib domain
```
![image](https://github.com/user-attachments/assets/67645782-194b-428f-a067-fd1a9051a7a9)

4. En el terminal, ejecutar el siguiente comando para crear los archivos necesarios para el laboratorio.
```
nest g itf ICommand -p domain --flat --no-spec
nest g cl Account -p domain --flat --no-spec
nest g cl WithdrawCommand -p domain --flat --no-spec
nest g cl DepositCommand -p domain --flat --no-spec
nest g cl ATM -p domain --flat --no-spec
```
![image](https://github.com/user-attachments/assets/8e8b5e80-ad38-44c0-ae12-006acc927c3b)

5. Iniciar Visual Studio Code (VS Code) abriendo el folder de la solución como proyecto. En el proyecto ATM, si existe un archivo app.controller.spec.ts proceder a eliminarlo..
![image](https://github.com/user-attachments/assets/b5289c15-1d61-4d90-bb9b-427dda7214f6)

6. En el VS Code, inicialmente se necesita implementar la clase Cuenta que se utilizara en todas los comandos del ATM. Para esto modificar el archivo account.ts en el proyecto ATM.Domain con el siguiente código:
```TS
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
```
![image](https://github.com/user-attachments/assets/4c2f7ccd-e0cb-4469-9543-1e160e96c5a7)

7. En el VS Code, seguidamente se necesita implementar la interfaz principal para la generación de comandos, para esto modificar el archivo icommand.interface.ts en el proyecto ATM.Domain con el siguiente código:
```TS
export interface ICommand {
  Execute(): void;
}
```
![image](https://github.com/user-attachments/assets/326a2289-decd-4b6a-9333-9fbf0df02306)

8. En el VS Code, ahora se debe implementar cada una de clases correspondiente a los comandos de Retirar y Depositar para eso se deberan modificar los siguientes archivos con el còdigo correspondiente:
> withdraw-command.ts
```TS
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
```
![image](https://github.com/user-attachments/assets/7dcb8769-ab5e-4c5a-a5da-c571e2f83e13)

> deposit-command.ts
```TS
import { Account } from './account';
import { ICommand } from './icommand.interface';

export class DepositCommand implements ICommand {
  _account: Account;
  _amount: number;

  constructor(account: Account, amount: number) {
    this._account = account;
    this._amount = amount;
  }
  Execute(): void {
    this._account.Deposit(this._amount);
  }
}
```
![image](https://github.com/user-attachments/assets/a1030632-fbd2-471d-a091-93f35a912176)

8. En el VS Code, finalmente para unir todos los comandos crear la clase ATM que permitira el manejo de los comandos, modificar el archivo atm.ts en el proyecto ATM.Domain:
```TS
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
```
![image](https://github.com/user-attachments/assets/bfb69023-5dd2-410b-a38a-b34f6b4b16d8)

9. Para probar esta implementación, modificar el archivo domain.service.spec.ts en el proyecto ATM.Domain:
```TS
import { Account } from './account';
import { WithdrawCommand } from './withdraw-command';
import { DepositCommand } from './deposit-command';
import { ATM } from './atm';

describe('GivenAccountAndWithdraw_ThenExecute_ReturnsCorrectAmount', () => {
  let account: Account;

  beforeEach(async () => {
    account = new Account();
    account.AccountBalance = 300;
    const amount = 100;
    const withdraw = new WithdrawCommand(account, amount);
    new ATM(withdraw).Action();
  });

  it('should be 200', () => {
    expect(account.AccountBalance == 200).toBeTruthy();
  });
});

describe('GivenAccountAndDeposit_ThenExecute_ReturnsCorrectAmount', () => {
  let account: Account;

  beforeEach(async () => {
    account = new Account();
    account.AccountBalance = 200;
    const amount = 100;
    const deposit = new DepositCommand(account, amount);
    new ATM(deposit).Action();
  });

  it('should be 300', () => {
    expect(account.AccountBalance == 300).toBeTruthy();
  });
});
```
![image](https://github.com/user-attachments/assets/69d89c7d-fc3b-40ab-8d81-9223a258839c)

10. Ahora necesitamos comprobar las pruebas contruidas para eso abrir un terminal en VS Code (CTRL + Ñ) o vuelva al terminal anteriormente abierto, y ejecutar el comando:
```Bash
npm run test:cov
```
![image](https://github.com/user-attachments/assets/6215acf1-993e-41d7-98bc-12641de94ebc)
![image](https://github.com/user-attachments/assets/76cd9020-c12c-47fb-8f1f-a56f2dba9843)

11. Si las pruebas se ejecutaron correctamente debera aparcer un resultado similar al siguiente:
```Bash
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```
![image](https://github.com/user-attachments/assets/c58f4e07-2e1c-43e6-808f-e8d9e22b736d)

12. Revisemos como funciona el patrón de diseño Comando.

![image](https://github.com/UPT-FAING-EPIS/SI889_PDS/assets/10199939/50ecff5e-dc02-4b54-980f-8b72546b4129)

Como se puede apreciar la imagen, el patron de diseño Comando consiste de 5 componentes:

Receiver: Es la clase que contiene la actual implementacionde los metods que el cliente quiere invocar. En este ejemplo la cuenta.
Command: Esta viene a ser la interfaz que espeficica la operacion Ejecutar.
ConcreteCommand: Con las clases que implementa la interfaz ICommand y proporcionan las implementaciones del metodo Ejecutar. 
Invoker: El Invocador viene a ser la clase que resuelve que Command realiza determinada acción. En este caso la clase ATM.
Client: Es la clase que crea y ejecuta el comando.

13. En el terminal, ejecutar el siguiente comando para generar el diagrama de clases respectivo
```Bash
tsuml2 --glob "./libs/**/*.ts" --outMermaidDsl "./class_diagram.md"
```
![image](https://github.com/user-attachments/assets/56a495e2-f944-4e5d-9f68-d2cc90037582)

14. En el VS Code, modificar el archivo class_diagram.md y adicionar \```mermaid al inicio del archivo y al final adicionar \```
![image](https://github.com/user-attachments/assets/2dade09d-dd3c-4731-96cf-a062a4d6e188)

15. En el terminal, ejecutar el siguiente comando para generar la documentación del proyecto, esta se creara en la carpeta documentation
```Bash
npx @compodoc/compodoc -p tsconfig.json -s
```
![image](https://github.com/user-attachments/assets/cf726f3b-302b-4619-9daf-8d4f878764f1)
![image](https://github.com/user-attachments/assets/1b05928f-1abd-4223-9373-7af5491b7f0c)
![image](https://github.com/user-attachments/assets/0fa77668-f6e6-41b8-aa7a-480299366f56)

---
## Actividades Encargadas
1. Completar la documentación de todas las clases, metodos, propiedades y generar una automatizaciòn .github/workflows/publish_docs.yml (Github Workflow) utilizando compodoc y publicar el site de documentaciòn generado en Github Pages.
2. Generar una automatización de nombre .github/workflows/package_npm.yml (Github Workflow) que ejecute:
   * Pruebas unitarias y reporte de pruebas automatizadas
   * Realice el analisis con SonarCloud.
   * Contruya los paquetes con nombre payment_[apellido] y atm_[apellido] y lo publique en Github Packages
3. Generar una automatización de nombre .github/workflows/release_version.yml (Github Workflow) que contruya la version (release) del paquete y publique en Github Releases.
