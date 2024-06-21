class StoreRegisterRequest {
    constructor(firstName, lastName, phone, dni, ruc, companyName, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.dni = dni;
        this.ruc = ruc;
        this.companyName = companyName;
        this.account = account;
    }
}

export default StoreRegisterRequest;