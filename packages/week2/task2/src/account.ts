export class Account {
  private strategy: WithdrawalStrategy;
  private balance: number;

  constructor(initialBalance: number, strategy: WithdrawalStrategy) {
    this.balance = initialBalance;
    this.strategy = strategy;
  }

  setStrategy(strategy: WithdrawalStrategy) {
    this.strategy = strategy;
  }

  withdraw(amount: number) {
    const result = this.strategy.withdraw(this.balance, amount);
    this.balance = result.newBalance;
    return result;
  }

  getBalance() {
    return this.balance;
  }
}
