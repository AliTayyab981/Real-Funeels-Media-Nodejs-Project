const { contacts } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case contacts.VALIDATION_ERROR:
            res.json({
                title: "validatiod Failed",
                messsage: err.message,
                stackTrace: err.stack
            })
            break;
        case contacts.NOT_FOUND:
            res.json({
                title: "Not Found",
                messsage: err.message,
                stackTrace: err.stack
            })
        case contacts.UNAUTHORIZED:
            res.json({
                title: "unauthorized",
                messsage: err.message,
                stackTrace: err.stack
            })
        case contacts.FORBIDDEN:
            res.json({
                title: "Forbidden",
                messsage: err.message,
                stackTrace: err.stack
            })
            case contacts.SERVER_ERROR:
                res.json({
                    title: "Several Error",
                    messsage: err.message,
                    stackTrace: err.stack
                })
        default:
            console.log("No Error All Good")
            break;
    }



};


module.exports = errorHandler;