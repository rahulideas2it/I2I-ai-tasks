import { Account } from '../src/account';
import { SavingsWithdrawal, CheckingWithdrawal, CryptoWithdrawal } from '../src/strategies';

describe('Withdrawal Strategy', () => {
  it('Savings - success', () => {
    const acc = new Account(1000, new SavingsWithdrawal());
    expect(acc.withdraw(500).newBalance).toBe(500);
  });

  it('Checking - overdraft', () => {
    const acc = new Account(100, new CheckingWithdrawal());
    expect(acc.withdraw(550).newBalance).toBe(-450);
  });

  it('Crypto - fee', () => {
    const acc = new Account(1100, new CryptoWithdrawal());
    const result = acc.withdraw(1000);
    expect(result.newBalance).toBeCloseTo(90);
  });
});
