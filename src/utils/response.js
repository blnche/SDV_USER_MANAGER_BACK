export class CustomError extends Error {
    code;
    errCode;
    error;

    constructor(code = 500, errCode = '', error = '') {
        super()
        this.name = 'CustomError',
        this.code = code,
        this.errCode = errCode,
        this.error = error,

        Object.setPrototypeOf(this, CustomError.prototype)
    }
}

export const sendCustomError = (customError, res) => {
    res.status(customError.code).json({
        code: customError.code,
        errCode: customError.errCode,
        error: customError.error
    })
}