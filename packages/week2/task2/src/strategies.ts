import { WithdrawalStrategy } from './withdrawal-strategy';

export class SavingsWithdrawal implements WithdrawalStrategy {
  withdraw(balance: number, amount: number) {
    if (amount > balance) return { newBalance: balance, message: 'Insufficient funds' };
    if (amount > 1000) return { newBalance: balance, message: 'Limit exceeded' };
    return { newBalance: balance - amount, message: 'Success from Savings' };
  }
}

export class CheckingWithdrawal implements WithdrawalStrategy {
  withdraw(balance: number, amount: number) {
    const overdraft = 500;
    if (amount > balance + overdraft) return { newBalance: balance, message: 'Overdraft exceeded' };
    return { newBalance: balance - amount, message: 'Success from Checking' };
  }
}

export class CryptoWithdrawal implements WithdrawalStrategy {
  withdraw(balance: number, amount: number) {
    const fee = 0.01 * amount;
    const total = amount + fee;
    if (total > balance) return { newBalance: balance, message: 'Insufficient crypto' };
    return { newBalance: balance - total, message: `Success from Crypto (Fee: ${fee.toFixed(2)})` };
  }
}
