import jwt from 'jsonwebtoken'

export const generateToken = (id,role) => {
    return jwt.sign({ id,role }, 
        process.env.JWT_SECRET, 
        { expiresIn: role === 'admin' ? '1d' : '15d'})
}