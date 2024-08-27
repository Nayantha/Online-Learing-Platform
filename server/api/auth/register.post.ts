// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { prisma } from '~/server/db'

interface AuthBody {
    email: string;
    password: string;
    name: string;
}

// Define the type of response
interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        password: string; // This should ideally not be included in the response
    };
}

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: AuthBody = await readBody(event);
    const { email, password, name } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const count = await prisma.student.count();

    // Create a new user
    const user = await prisma.student.create({
        data: {
            email,
            password: hashedPassword,
            name: name,
            std_id: `ST\\00${count+1}\\`
        },
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, '4b7e35d3d60d3d8461efea6e33c6fa7b', { expiresIn: '1h' });

    // Return the response
    return { token, user: { id: user.id, email: user.email, password: hashedPassword } };
});
