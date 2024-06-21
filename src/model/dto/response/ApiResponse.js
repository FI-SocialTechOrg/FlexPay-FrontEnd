class SuccessResponse {
    constructor(message, status, data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}

class ErrorResponse {
    constructor(statusCode, message, description, timeStamp) {
        this.statusCode = statusCode;
        this.message = message;
        this.description = description;
        this.timeStamp = timeStamp;
    }
}

export { SuccessResponse, ErrorResponse };