// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { prisma } from '~/server/db'
import { AuthResponse, RegisterAuthBody } from '~/utils/types';

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: RegisterAuthBody = await readBody(event);
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return { token, user: { id: user.id, email: user.email }, message: "Successfully registered." };
});
