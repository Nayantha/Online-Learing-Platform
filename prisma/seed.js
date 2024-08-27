import {PrismaClient} from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const hashedPassword = await bcrypt.hash("password", 10)

const studentData = [
    {
        name: 'Alice',
        email: 'alice@prisma.io',
        std_id: 'ST001',
        password: hashedPassword,
    },
    {
        name: 'Nilu',
        email: 'nilu@prisma.io',
        std_id: 'ST002',
        password: hashedPassword,
    },
    {
        name: 'Mahmoud',
        email: 'mahmoud@prisma.io',
        std_id: 'ST003',
        password: hashedPassword,
    },
];

const adminData = [
    {
        name: 'Alice',
        email: 'alice@prisma.io',
        password: hashedPassword,
    },
];

const courseData = [
    {
        id: 1,
        name: 'Math 101',
        description: 'Introduction to Algebra'
    },
    {
        id: 2,
        name: 'Physics 101',
        description: 'Introduction to Mechanics'
    },
];

const enrollmentData = async () => [
    {
        studentId: (await prisma.student.findUnique({ where: { email: 'alice@prisma.io' } })).id,
        courseId: (await prisma.course.findUnique({ where: { id: 1 } })).id,
    },
    {
        studentId: (await prisma.student.findUnique({ where: { email: 'nilu@prisma.io' } })).id,
        courseId: (await prisma.course.findUnique({ where: { id: 2 } })).id,
    },
];

async function main() {
    console.log(`Start seeding ...`);

    // Delete all existing data in reverse order of dependency
    await prisma.enrollment.deleteMany();
    await prisma.student.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.course.deleteMany();
    console.log(`All existing data deleted.`);

    // Create students
    for (const s of studentData) {
        const student = await prisma.student.create({
            data: s,
        });
        console.log(`Created student with id: ${student.id}`);
    }

    // Create admin
    for (const a of adminData) {
        const admin = await prisma.admin.create({
            data: a,
        });
        console.log(`Created student with id: ${admin.id}`);
    }

    // Create courses
    for (const c of courseData) {
        const course = await prisma.course.create({
            data: c,
        });
        console.log(`Created course with id: ${course.id}`);
    }

    // Create enrollments
    const enrollments = await enrollmentData();
    for (const e of enrollments) {
        const enrollment = await prisma.enrollment.create({
            data: e,
        });
        console.log(`Created enrollment with id: ${enrollment.id}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
