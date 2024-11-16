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
    this.examService.findAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => this.exams = res);
  }

  navigateToExamRegister() {
    this.router.navigate(['register'], { relativeTo: this.route }).then();
  }

}
