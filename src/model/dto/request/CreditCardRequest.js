class CreditCardRequest {
    constructor(initialCredit, balance, purchase, purchaseInterest, debt, stateCard, shoppingCart) {
        this.initialCredit = initialCredit;
        this.balance = balance;
        this.purchase = purchase;
        this.purchaseInterest = purchaseInterest;
        this.debt = debt;
        this.stateCard = stateCard;
        this.shoppingCart = shoppingCart;
    }
}

export default CreditCardRequest;