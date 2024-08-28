// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import {prisma} from '~/server/db'
import {AuthResponse, RegisterAuthBody, Session, Student} from '~/utils/types';
import {createSession} from "~/server/sessionManager";

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: RegisterAuthBody = await readBody(event);
    const {email, password, name} = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const count = await prisma.student.count();

        const student: Student = await prisma.student.create({
            data: {
                email,
                password: hashedPassword,
                name: name,
                std_id: `ST\\00${count + 1}\\`
            },
        }) as Student;

        const session: Session = await createSession({userId: student.id, userType: "student"});
        return {
            session: session,
            token: session.token,
            user: {id: student.id, email: student.email},
            message: "ok"
        };
    } catch (e) {
        return {session: null, token: null, user: null, message: "Something went wrong"};
    }
});
