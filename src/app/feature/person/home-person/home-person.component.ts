import { Component, inject, OnInit } from '@angular/core';
import { PersonService } from '../../../core/services/person.service';
import { Person } from '../../../core/interfaces/person.interface';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-person',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home-person.component.html'
})
export class HomePersonComponent implements OnInit {

  persons: Person[] = [];
  private personService = inject(PersonService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.personService.findAll().subscribe(res => {
      this.persons = res;
      console.log(this.persons);
    });
  }

  navigateRegisterPerson() {
    this.router.navigate(['register'], {relativeTo: this.route}).then();
  }

  deletePerson(id: string) {
    const isDelete = confirm('Estas seguro de eliminar');
    if (isDelete) {
      this.personService.delete(id).subscribe(() => {
        this.getPersons();
      });
    }
  }

}
