// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import {prisma} from '~/server/db'
import {createSession} from '~/server/sessionManager';
import {Admin, AuthResponse, LoginAuthBody} from "~/utils/types";

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: LoginAuthBody = await readBody(event);
    const {email, password} = body;

    const admin: Admin = await prisma.admin.findUniqueOrThrow({
        where: {
            email: email
        },
    });

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (isPasswordValid) {

        const session = await createSession({userId: Number(admin.id), userType: "admin"});
        return {
            session: session,
            token: session.token, user: {id: admin.id, email: admin.email}, message: "ok"
        };
    } else {
        return {token: null, user: null, "message": "wrong password", session: null}
    }


});
