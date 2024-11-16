import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person } from '@vg/core/interfaces';
import { environment } from '@vg/env/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  selectedPerson!: Person | null;

  private http = inject(HttpClient);

  findAll(type?: string) {
    let options = {}
    if (type) {
      options = {
        params: {type}
      }
    }
    return this.http.get<Person[]>(`${environment.apiUrl}/persons`, options);
  }

  findById(id: string) {
    return this.http.get<Person>(`${environment.apiUrl}/persons/${id}`);
  }

  create(person: Person) {
    return this.http.post<Person>(`${environment.apiUrl}/persons`, person);
  }

  update(id: string, person: Person) {
    return this.http.put<Person>(`${environment.apiUrl}/persons/${id}`, person);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/persons/${id}`);
  }

}
