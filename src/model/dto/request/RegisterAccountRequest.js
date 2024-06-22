class RegisterAccountRequest {
    constructor(userName, email, password, roleId) {
      this.userName = userName;
      this.email = email;
      this.password = password;
      this.role = roleId;
    }
  }
  
  export default RegisterAccountRequest;