import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

// Define types for request body
interface AuthBody {
    email: string;
    password: string;
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

// Create an instance of PrismaClient
const prismaClient = new PrismaClient();

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: AuthBody = await readBody(event);
    const { email, password } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prismaClient.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    // Return the response
    return { token, user: { id: user.id, email: user.email, password: hashedPassword } };
});
