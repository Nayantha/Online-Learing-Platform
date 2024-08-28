import {prisma} from "~/server/db";
import {Session} from "~/utils/types";


export default defineEventHandler(async (event: any) => {
    const token: string = getRouterParam(event, 'token');
    try {
        const session: Session = await prisma.session.findUniqueOrThrow({
            where: {
                token
            }
        });

        if (new Date().getTime() > session.expiresAt.getTime()) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
})