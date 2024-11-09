import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '@vg/core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-save-person',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './save-person.component.html',
  styleUrl: './save-person.component.scss'
})
export class SavePersonComponent implements OnInit, OnDestroy {

  personId!: string;
  loading: boolean = false;
  personForm: FormGroup = new FormGroup<any>({});
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public personService = inject(PersonService);

  constructor() {
    if (!this.personService.selectedPerson) {
      this.route.params.subscribe(param => {
        this.personId = param['id'];
        if (this.personId) {
          this.findPerson(this.personId);
        }
      })
    }
  }

  ngOnInit(): void {
    this.initPersonForm();
  }

  initPersonForm() {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      address: [''],
      birthday: ['']
    });
    if (this.personService.selectedPerson) {
      this.personForm.patchValue(this.personService.selectedPerson);
    }
  }

  savePerson() {
    console.log('Se ejecuto el evento');
    if (this.personService.selectedPerson) {
      this.update(this.personService.selectedPerson.id)
    } else {
      this.register();
    }
  }

  register() {
    this.loading = true;
    console.log(this.personForm.value);
    this.personService.create(this.personForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        console.log('Persona:', res);
        alert('Persona agregada');
        this.navigatePersonList();
      });
  }

  update(personId: string) {
    this.loading = true;
    this.personService.update(personId, this.personForm.value)
    .pipe(finalize(() => this.loading = false))
    .subscribe(res => {
      console.log('Persona:', res);
      alert('Persona actualizada');
      this.navigatePersonList();
    });
  }

  findPerson(id: string) {
    this.personService.findById(this.personId)
      .subscribe(person => {
        this.personService.selectedPerson = person;
        this.personForm.patchValue(person);
      });
  }

  navigatePersonList() {
    this.router.navigate(['/admin/persons']).then();
  }

  get f() {
    return this.personForm.controls;
  }

  ngOnDestroy(): void {
    this.personService.selectedPerson = null;
  }

}
