import jwt from 'jsonwebtoken'


export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Cliente sem Login",
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'bananadoce')
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error,
        });
    }
}