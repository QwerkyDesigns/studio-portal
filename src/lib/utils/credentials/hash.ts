var bcrypt = require('bcryptjs');

export default function hashPassword(password: string) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
}
