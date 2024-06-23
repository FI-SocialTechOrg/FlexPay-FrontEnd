class ClientRegisterRequest {
    constructor(firstName, lastName, dni, phone, gender, birthday, photoUrl, creditTerm, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dni = dni;
        this.phone = phone;
        this.gender = gender;  
        this.birthday = birthday;
        this.photoUrl = photoUrl;
        this.creditTerm = creditTerm;
        this.account = account;
    }
}

export default ClientRegisterRequest;