import { prisma } from '~/server/db';
import { Course } from '~/utils/types';

export default defineEventHandler(async (event: any) => {
    const updatedCourse: Course = await readBody(event);

    const courseId: number = Number(getRouterParam(event, 'id'));
    updatedCourse.id = courseId;

    try {
        await prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                ...updatedCourse,
            },
        });
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
});
