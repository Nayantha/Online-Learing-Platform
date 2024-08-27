import { prisma } from '~/server/db';
import { CourseCreationResponseBody } from "~/utils/types";

export default defineEventHandler(async (event: any) => {
    const courseId: String = event.context.params.id;

    try {
        await prisma.course.delete({
            where: {
                // @ts-ignore
                id: parseInt(courseId)
            }
        });
        return { "message": `Course is removed.` } as CourseCreationResponseBody;
    } catch (e) {
        return { "message": "Something went wrong" } as CourseCreationResponseBody;
    }
});
