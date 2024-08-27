// @ts-ignore
import jwt from "jsonwebtoken";
import { prisma } from "~/server/db";
import { CreateSessionData, Session } from "~/utils/types";

export function createJWT(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

const getNowPlusOneHour = () => {
    const now = new Date();            // Get the current time
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);  // Add 1 hour
    return oneHourLater.toISOString();
};

export async function createSession(sessionData: CreateSessionData){
    const token = createJWT(sessionData.userId);
    try {
        const session =  await prisma.session.findUniqueOrThrow({
            where: sessionData.userId
        }) as Session;

        if (new Date().getTime() > session.expiresAt.getTime()) {
            throw new Error("expired");
        }

        return session;

    } catch (e) {
        return await prisma.session.create({data: { ...sessionData, token, expiresAt: getNowPlusOneHour()}}) as Session;
    }
}

export async function removeSession(sessionData: Session) {
    await prisma.session.delete({
        where: sessionData.id
    })
}