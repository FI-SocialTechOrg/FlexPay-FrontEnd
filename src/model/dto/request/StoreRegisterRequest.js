class StoreRegisterRequest {
    constructor(firstName, lastName, phone, dni, ruc, companyName, imageUrl, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.dni = dni;
        this.ruc = ruc;
        this.companyName = companyName;
        this.imageUrl = imageUrl;
        this.account = account;
    }
}

export default StoreRegisterRequest;