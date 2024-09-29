class ResponseService {
    static success({ res, data, message, status = 200 }) {
        return res.status(status).json({
            data,
            message
        });
    }

    static error({ res, message, status = 500 }) {
        return res.status(status).json({
            error: message
        });
    }

    static notFound({ res, message }) {
        return res.status(404).json({
            error: message
        });
    }

    static unauthorized({ res, message }) {
        return res.status(401).json({
            error: message
        });
    }

    static forbidden({ res, message }) {
        return res.status(403).json({
            error: message
        });
    }

    static badRequest({ res, message }) {
        return res.status(400).json({
            error: message
        });
    }

    static conflict({ res, message }) {
        return res.status(409).json({
            error: message
        });
    }

    static validationError({ res, message }) {
        return res.status(422).json({
            error: message
        });
    }


}

module.exports = { ResponseService };