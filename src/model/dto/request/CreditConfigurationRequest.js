class CreditConfigurationRequest{
    constructor(maxCredit, monthlyFee, discount, gracePeriod, graceType, initialFee, store){
        this.maxCredit = maxCredit;
        this.monthlyFee = monthlyFee;
        this.discount = discount;
        this.gracePeriod = gracePeriod;
        this.graceType = graceType;
        this.initialFee = initialFee;
        this.store = store;
    }

}

export default CreditConfigurationRequest;  