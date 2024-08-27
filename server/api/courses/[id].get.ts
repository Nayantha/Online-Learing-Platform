import { prisma } from '~/server/db';
import { Course } from '~/utils/types';

export default defineEventHandler(async (event: any) => {
    const courseId: number = Number(getRouterParam(event, 'id'));
    return prisma.course.findUniqueOrThrow({
        where: {
            id: courseId
        }
    }) as Course;
});
