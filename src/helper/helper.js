
module.exports = {
    showValidationErrorResponse: (message) => {
        const resData = { "status": "failure", "statusCode": 403, "error_description": "validation error!", "message": (message) };
        return resData;
    },
    showErrorResponse: (message) => {
        const resData = { "status": "failure", "statusCode": 400, "error_description": "validation error!", "message": (message) };
        return resData;
    },

    showInternalServerErrorResponse: (message) => {
        const resData = { "status": "failure", "statusCode": 500, "error_description": "internal coding error or params undefined!", "message": message };
        return resData;
    },

    showUnathorizedErrorResponse: (message) => {
        const resData = { "status": "failure", "statusCode": 401, "error_description": "invalid login credential!", "message": (message) };
        return resData;
    },

    showUnathorizedErrorResponseAccess: (message) => {
        const resData = { "status": "failure", "statusCode": 401, "error_code": 5011, "error_description": "You have not access for this!", "message": (message) };
        return resData;
    },

    showUnathorizedAppErrorResponse: (message) => {
        const resData = { "status": "failure", "statusCode": 200, "error_code": 5004, "error_description": "Unathorized Access!", "message": (message) };
        return resData;
    },

    showUnathorizedAppErrorWithErrorCode: (message, error_code) => {
        let resData = { "status": "failure", "statusCode": 200, "error_code": Number(error_code), "error_description": "Unathorized Access!", "message": (message) };
        return resData;
    },

    showDatabaseErrorResponse: (message, error) => {
        const resData = { "status": "failure", "statusCode": 502, "error_description": "Database error!", "message": (message), "error": error };
        return resData;
    },
    showSuccessResponse: (message, data) => {
        const resData = { "status": "success", "statusCode": 200, "message": (message), "accessToken": data };
        return resData;
    },
    createResponse: (message, data) => {
        const resData = { "status": "success", "statusCode": 201, "message": (message), "data": data };
        return resData;
    },
    simpleResponse :(message) => {
        const resData = { "status": "success", "statusCode": 201, "message": (message)};
        return resData;
    }
}