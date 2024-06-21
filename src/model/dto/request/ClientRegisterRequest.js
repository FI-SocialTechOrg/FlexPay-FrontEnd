class ClientRegisterRequest {
    constructor(firstName, lastName, dni, phone, gender, birthday, photoUrl, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dni = dni;
        this.phone = phone;
        this.gender = gender;  
        this.birthday = birthday;
        this.photoUrl = photoUrl;
        this.account = account;
    }
}

export default ClientRegisterRequest;