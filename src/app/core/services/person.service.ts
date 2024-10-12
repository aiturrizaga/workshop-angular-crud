import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private http = inject(HttpClient);

  findAll() {
    return this.http.get<Person[]>('http://localhost:8085/oraclecloud/v1/persons');
  }

  create(person: Person) {
    return this.http.post<Person>('http://localhost:8085/oraclecloud/v1/persons', person);
  }

}
