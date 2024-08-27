import { prisma } from '~/server/db';

export default defineEventHandler(async () => {
    return prisma.course.findMany();
});
