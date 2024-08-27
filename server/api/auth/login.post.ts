// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { prisma } from '~/server/db'
import { createSession } from '~/server/sessionManager';
import { AuthResponse, LoginAuthBody } from "~/utils/types";

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: LoginAuthBody = await readBody(event);
    const { email, password } = body;

    const student = await prisma.student.findUniqueOrThrow({
        where: {
            email: email
        },
    });

    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (isPasswordValid) {

        const session = await createSession({userId: student.id, userType: "student"});
        return {
            session: session,
            token: session.token, user: { id: student.id, email: student.email }, message : "ok"
        };
    } else {
        return { token: null, user: null, "message": "wrong password", session: null}
    }


});
