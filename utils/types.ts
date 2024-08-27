export interface Student {
    id: number;
    email: string;
    name: string;
    std_id: string;
    password: string;
    enrollments: Enrollment[];
    sessions: Session[];  // Multiple sessions
}
export interface Admin {
    id: number;
    email: string;
    name: string;
    password: string;
    sessions: Session[];  // Multiple sessions
}
export interface Course {
    id: number;
    name: string;
    description?: string;
    enrollments: Enrollment[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Enrollment {
    id: number;
    student: Student;
    studentId: number;
    course: Course;
    courseId: number;
    createdAt: Date;
}
export interface Session {
    id: number;
    userId: number;
    userType: 'student' | 'admin';  // To differentiate between user types
    token: string;
    createdAt: Date;
    expiresAt: Date;
    student?: Student;  // Optional relation to Student
    admin?: Admin;      // Optional relation to Admin
}
export interface CourseCreationBody {
    name: string;
    description: string;
}
export interface CourseCreationResponseBody {
    message: string;
    data: object;
}
export interface LoginAuthBody {
    email: string;
    password: string;
}
export interface RegisterAuthBody {
    email: string;
    password: string;
    name: string;
}
export interface AuthResponse {
    token: string | null;
    user: {
        id: number;
        email: string;
    } | null;
    message: string;
    session: Session | null;
}
export interface User {
    id: number;
    name: string;
    email: string;
    std_id?: string;
    userType: 'student' | 'admin';
}
export interface CreateSessionData {
    userType: 'student' | 'admin';
    userId: string;
}
export interface StoreUser{
    email: string | null;
    id: number | null;
}