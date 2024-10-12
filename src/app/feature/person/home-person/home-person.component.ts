import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../../../core/services/person.service';
import { Person } from '../../../core/interfaces/person.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-person',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home-person.component.html'
})
export class HomePersonComponent implements OnInit {

  persons: Person[] = [];
  private personService = inject(PersonService);

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.personService.findAll().subscribe(res => {
      this.persons = res;
      console.log(this.persons);
    });
  }

}
