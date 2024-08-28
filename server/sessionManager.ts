// @ts-ignore
import jwt from "jsonwebtoken";
import {prisma} from "~/server/db";
import {CreateSessionData, Session} from "~/utils/types";

const JWT_EXPIRE_TIME = 1; // 1 hour

export function createJWT(userId: number, userType: "student" | "admin") {
    return jwt.sign({userId, userType}, process.env.JWT_SECRET as string, {expiresIn: `${JWT_EXPIRE_TIME}h`});
}

const getNowPlusOneHour = () => {
    const now = new Date();            // Get the current time
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000 * JWT_EXPIRE_TIME);  // Add 1 hour
    return oneHourLater.toISOString();
};

export async function createSession(sessionData: CreateSessionData) {

    try {
        const session = await prisma.session.findUniqueOrThrow({
            where: {
                userId_userType: {
                    userId: sessionData.userId,
                    userType: sessionData.userType
                }
            }
        }) as Session;

        const secret = process.env.JWT_SECRET as string;
        const decodedToken = jwt.verify(session.token, secret);

        console.log(decodedToken)

        if (new Date().getTime() > session.expiresAt.getTime()) {
            await removeSession(session);
            throw new Error("expired");
        }

        return session;

    } catch (e) {
        const token = createJWT(sessionData.userId, sessionData.userType);

        return await prisma.session.create({
            data: {
                ...sessionData,
                token,
                expiresAt: getNowPlusOneHour()
            }
        }) as Session;
    }
}

export async function removeSession(session: Session) {
    await prisma.session.delete({
        where: {
            id: session.id
        }
    })
}