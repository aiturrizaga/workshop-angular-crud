export interface Exam {
    id?: string;
    teacherId: string;
    fullName?: string;
    topic: string;
    average?: number;
    course: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    details?: ExamDetail[];
}

export interface ExamDetail {
    id?: number;
    studentId: string;
    fullName?: string;
    score: number;
    comment: string;
}

export type ExamUpdate = Pick<Exam, 'teacherId' | 'topic' | 'course'>;
