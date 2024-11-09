import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  selectedPerson!: Person | null;

  private http = inject(HttpClient);

  findAll() {
    return this.http.get<Person[]>('https://9lk3jtqj-8085.brs.devtunnels.ms/oraclecloud/v1/persons');
  }

  findById(id: string) {
    return this.http.get<Person>('https://9lk3jtqj-8085.brs.devtunnels.ms/oraclecloud/v1/persons/' + id);
  }

  create(person: Person) {
    return this.http.post<Person>('https://9lk3jtqj-8085.brs.devtunnels.ms/oraclecloud/v1/persons', person);
  }

  update(id: string, person: Person) {
    return this.http.put<Person>('https://9lk3jtqj-8085.brs.devtunnels.ms/oraclecloud/v1/persons/' + id, person);
  }

  delete(id: string) {
    return this.http.delete('https://9lk3jtqj-8085.brs.devtunnels.ms/oraclecloud/v1/persons/' + id);
  }

}
