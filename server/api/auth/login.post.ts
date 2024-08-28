// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import {prisma} from '~/server/db'
import {createSession} from '~/server/sessionManager';
import {AuthResponse, LoginAuthBody, Session, Student} from "~/utils/types";

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: LoginAuthBody = await readBody(event);
    const {email, password} = body;

    const student: Student = await prisma.student.findUniqueOrThrow({
        where: {
            email: email
        },
    }) as Student;

    const isPasswordValid: boolean = await bcrypt.compare(password, student.password);

    if (isPasswordValid) {

        const session: Session = await createSession({userId: student.id, userType: "student"});
        return {
            session: session,
            token: session.token, user: {id: student.id, email: student.email}, message: "ok"
        };
    } else {
        return {token: null, user: null, "message": "wrong password", session: null}
    }
});
