import bcrypt from 'bcryptjs';
import { db } from "../../config/firebase";
import { IUser } from '../../models/User';
import { v4 as uuidv4 } from 'uuid';

class AuthService {
    async register(email: string, password: string, role?: string): Promise<IUser> {
        const userId = uuidv4();
        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();
        
        if (doc.exists) {
            throw new Error('User already exists');
        }
        
        const hasedPassword = await bcrypt.hash(password, 10);
        const user: IUser = {
            id: userId,
            email,
            password: hasedPassword,
            role: role || 'user',
        };
        await userRef.set(user);

        return user;
    }

    async login(email: string, password: string): Promise<IUser> {
        const userRef = db.collection('users');
        const userSnapshot = await userRef.where('email', '==', email).get();

        if (userSnapshot.empty) {
            throw new Error('User not found!');
        }

        const doc = userSnapshot.docs[0];
        const user = doc.data() as IUser;
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials!');
        }

        return user;
    }
}

export default new AuthService();