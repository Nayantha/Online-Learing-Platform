// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { prisma } from '~/server/db'

interface LoginAuthBody {
    email: string;
    password: string;
}

// Define the type of response
interface LoginAuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        password: string; // This should ideally not be included in the response
    };
    message: string;
}

export default defineEventHandler(async (event: LoginAuthResponse): Promise<LoginAuthResponse> => {
    const body: LoginAuthBody = await readBody(event);
    const { email, password } = body;

    // get user
    const user = await prisma.student.findUniqueOrThrow({
        where: {
            email: email
        },
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, '4b7e35d3d60d3d8461efea6e33c6fa7b', { expiresIn: '1h' });

        // Return the response
        return {
            token, user: { id: user.id, email: user.email, password: user.password },message : "ok"
        };
    } else {
        return { token: "", user: { email: "", id: 0, password: "" }, "message": "wrong password"}
    }


});
