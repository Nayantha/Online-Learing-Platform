// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { prisma } from '~/server/db'
import { AuthResponse, LoginAuthBody } from "~/utils/types";

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
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
            token, user: { id: user.id, email: user.email },message : "ok"
        };
    } else {
        return { token: "", user: { email: "", id: 0 }, "message": "wrong password"}
    }


});
