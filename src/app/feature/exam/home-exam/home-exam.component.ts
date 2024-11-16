import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.getExams();
  }

  getExams() {
    this.loading = true;
    this.examService.findAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => this.exams = res);
  }

}
