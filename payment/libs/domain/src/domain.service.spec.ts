import { Test, TestingModule } from '@nestjs/testing';
import { DomainService } from './domain.service';
import { PaymentService } from './payment-service';  // Importamos PaymentService
import { PaymentType } from './payment-service';  // Importamos el enum PaymentType

describe('DomainService', () => {
  let service: DomainService;
  let paymentService: PaymentService;  // Declaramos paymentService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainService, PaymentService],  // Agregamos PaymentService a los providers
    }).compile();

    service = module.get<DomainService>(DomainService);
    paymentService = module.get<PaymentService>(PaymentService);  // Inicializamos paymentService
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Pruebas para el PaymentService

  describe('GivenAValidPaymentTypeAndAmount_WhenProcessPayment_ResultIsSuccesful', () => {
    type TestCase = [paymentType: number, amount: number];

    it.each<TestCase>([
      [PaymentType.CreditCard, 1000],
      [PaymentType.DebitCard, 2000],
      [PaymentType.Cash, 3000],
    ])('Payment type %i and amount %i should be true', (paymentType, amount) => {
      expect(paymentService.ProcessPayment(paymentType, amount)).toBeTruthy();
    });
  });

  describe('GivenAnUnknownPaymentTypeAndAmount_WhenProcessPayment_ResultIsError', () => {
    type TestCase = [paymentType: number, amount: number];

    it.each<TestCase>([
      [4, 4000],  // Usamos un valor de pago no válido
    ])('Payment type %i and amount %i should be error', (paymentType, amount) => {
      expect(() => {
        paymentService.ProcessPayment(paymentType, amount);  // Comprobamos el error esperado
      }).toThrow("You Select an Invalid Payment Option");
    });
  });
});
