import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@vg/env/environment';
import { Exam, ExamDetail, ExamUpdate } from '@vg/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  #http = inject(HttpClient);

  findAll() {
    return this.#http.get<Exam[]>(`${environment.apiUrl}/exams`);
  }

  create(exam: Exam) {
    return this.#http.post<Exam>(`${environment.apiUrl}/exams`, exam);
  }

  update(id: string, exam: ExamUpdate) {
    return this.#http.put<Exam>(`${environment.apiUrl}/exams/${id}`, exam);
  }

  delete(id: string) {
    return this.#http.delete(`${environment.apiUrl}/exams/${id}`);
  }

  addDetail(examId: string, detail: ExamDetail) {
    return this.#http.post<Exam>(`${environment.apiUrl}/exams/${examId}/details`, detail);
  }

}
