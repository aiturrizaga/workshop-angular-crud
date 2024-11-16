import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exam, ExamDetail, Person } from '@vg/core/interfaces';
import { ExamService, PersonService } from '@vg/core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-save-exam',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './save-exam.component.html',
  styles: ``
})
export class SaveExamComponent implements OnInit {

  loading: boolean = false;
  teachers: Person[] = [];
  students: Person[] = [];
  examForm: FormGroup = new FormGroup<any>('');
  examDetailForm: FormGroup = new FormGroup<any>('');
  examDetails: ExamDetail[] = [];

  personService = inject(PersonService);
  examService = inject(ExamService);
  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    this.initExamForm();
    this.initExamDetailForm();
    this.getTeachers();
    this.getStudents();
  }

  getTeachers() {
    this.personService.findAll('teacher')
      .subscribe(res => this.teachers = res);
  }

  getStudents() {
    this.personService.findAll('student')
      .subscribe(res => this.students = res);
  }

  initExamForm() {
    this.examForm = this.fb.group({
      teacherId: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      course: ['', [Validators.required]]
    });
  }

  initExamDetailForm() {
    this.examDetailForm = this.fb.group({
      student: ['', [Validators.required]],
      score: [0, [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }

  addDetail() {
    const detail: ExamDetail = { ...this.examDetailForm.value };
    const student: Person = this.examDetailForm.controls['student'].value;
    detail.studentId = student.id;
    detail.fullName = `${student.name} ${student.lastname}`;
    this.examDetails.push(detail);
  }

  removeDetail(studentId: string) {
    const index = this.examDetails.findIndex(detail => detail.studentId === studentId);
    this.examDetails.splice(index, 1);
  }

  saveExam() {
    if (this.examForm.invalid)
      return;

    this.loading = true;
    const exam: Exam = { ...this.examForm.value };
    exam.details = this.examDetails;
    this.examService.create(exam)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        alert(`Examen ${res.topic} creado con exito`);
        this.navigateExamHome();
      });
  }

  navigateExamHome() {
    this.router.navigate(['/admin/exams']).then();
  }

  compareFn(value: any, option: any): boolean {
    return value.id === option.id;
  }

}
