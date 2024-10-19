import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonService } from '../../../core/services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-person',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './save-person.component.html',
  styleUrl: './save-person.component.scss'
})
export class SavePersonComponent implements OnInit {

  personForm: FormGroup = new FormGroup<any>({});
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private personService = inject(PersonService);

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
  }

  register() {
    console.log(this.personForm.value);
    this.personService.create(this.personForm.value).subscribe(res => {
      console.log('Persona:', res);
      alert('Persona agregada');
      this.navigatePersonList();
    });
  }

  navigatePersonList() {
    this.router.navigate(['/admin/persons']).then();
  }

  get f() {
    return this.personForm.controls;
  }

}
