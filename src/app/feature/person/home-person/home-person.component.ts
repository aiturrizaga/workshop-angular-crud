import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '@vg/core/services';
import { Person } from '@vg/core/interfaces';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-person',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home-person.component.html'
})
export class HomePersonComponent implements OnInit {

  persons: Person[] = [];
  loading: boolean = false;
  skeletonArray = new Array(5);
  private personService = inject(PersonService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons() {
    this.loading = true;
    this.personService.findAll('student')
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.persons = res;
        console.log(this.persons);
      });
  }

  navigateRegisterPerson() {
    this.router.navigate(['register'], { relativeTo: this.route }).then();
  }

  navigateUpdatePerson(person: Person) {
    this.personService.selectedPerson = person;
    this.router.navigate([person.id], { relativeTo: this.route }).then();
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
