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
