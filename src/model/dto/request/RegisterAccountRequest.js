class RegisterAccountRequest {
    constructor(userName, email, password, role) {
      this.userName = userName;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  
  export default RegisterAccountRequest;