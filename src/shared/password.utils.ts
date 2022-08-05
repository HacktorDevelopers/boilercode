import bcrypt from 'bcrypt';


/// Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

/// Match password
export const matchPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}
