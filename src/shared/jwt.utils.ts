import jwt, { SignOptions, sign,Secret, JwtPayload } from 'jsonwebtoken'


export const generateToken = (payload: any, secret: Secret, options: SignOptions) => {
    return sign(payload, secret, options);
}

/// verify JWT
export const verifyJWT = (token: string, secret: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}