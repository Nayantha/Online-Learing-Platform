import { prisma } from '~/server/db';
import { Course } from '~/utils/types';

export default defineEventHandler(async () => {
    return prisma.course.findMany() as Course[];
});
