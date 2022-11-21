import * as bcrypt from 'bcrypt';

const compare = async (password: string, passHash: string) => bcrypt.compare(password, passHash);

export default compare;