import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '@vg/core/interfaces';
import { ExamService } from '@vg/core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-exam',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home-exam.component.html',
  styles: ``
})
export class HomeExamComponent implements OnInit {

  loading: boolean = false;
  skeletonArray = new Array(5);
  exams: Exam[] = [];

  examService = inject(ExamService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getExams();
  }

  getExams() {
    this.loading = true;
    this.examService.findAll({ active: true })
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => this.exams = res);
  }

  deleteExam(exam: Exam, event: Event) {
    event.stopPropagation();
    const confirmed = confirm(`¿Estás seguro de que deseas eliminar el examen ${exam.topic}?`);
    if (confirmed) {
      this.examService.delete(exam.id)
        .subscribe(() => {
          alert(`Examen ${exam.topic} ha sido eliminado`);
          this.getExams();
        });
    }
  }

  navigateToExamRegister() {
    this.router.navigate(['register'], { relativeTo: this.route }).then();
  }

  navigateToExamDetail(exam: Exam) {
    this.examService.selectedExam = exam;
    this.router.navigate([exam.id], { relativeTo: this.route }).then();
  }

}
