import crypto from 'node:crypto'



const ENCRYPTION_KEY =Buffer.from("233333333333S@#fffffffffffrtc53g")
const IV_LENGTH = 16; // For AES, the IV is always 16 bytes


export function Decrypt(text) {
    const [ivHex, encryptedText] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


// 🔑 Use 32 bytes (256 bits) for AES-256

export function Encrypt(plainText) {
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    let encrypted = cipher.update(plainText, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}