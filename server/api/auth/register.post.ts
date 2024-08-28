// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';
import {prisma} from '~/server/db'
import {AuthResponse, RegisterAuthBody, Student} from '~/utils/types';

export default defineEventHandler(async (event: AuthResponse): Promise<AuthResponse> => {
    const body: RegisterAuthBody = await readBody(event);
    const {email, password, name} = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const count = await prisma.student.count();

    const student: Student = await prisma.student.create({
        data: {
            email,
            password: hashedPassword,
            name: name,
            std_id: `ST\\00${count + 1}\\`
        },
    }) as Student;

    const token = jwt.sign({userId: student.id}, process.env.JWT_SECRET as string, {expiresIn: '1h'});

    return {session: null, token, user: {id: student.id, email: student.email}, message: "Successfully registered."};
});
