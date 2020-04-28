import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EstablishmentFormService } from './establishment-form.service';

@Component({
  selector: 'app-establishment-form',
  templateUrl: './establishment-form.component.html',
  styleUrls: ['./establishment-form.component.scss']
})
export class EstablishmentFormComponent implements OnInit {

  constructor(private fb:FormBuilder, private establishmentFormService:EstablishmentFormService) { }

  addEstablishmentForm:FormGroup;
  days:Array<object> = [];
  day:object;
  location:object;
  errorMessage:string;

  addDay() {
    let newDay = this.addEstablishmentForm.value.operHours
    for (let day of this.days) {
      if (day['day'] == newDay['day']) {
        if (day['openingTime']['time']+day['openingTime']['zone'] == newDay['openingTime']['time']+day['openingTime']['zone']) {
          if (day['closingTime']['time'] +  day['closingTime']['zone']== newDay['closingTime']['time'] + newDay['closingTime']['zone']) {
            return alert("You've already selected this day and time combination!")
          }
        }
      }
    }
    this.days.push(newDay);
  }

  ngOnInit(): void {
    this.addEstablishmentForm = this.fb.group({
      'name': ['', [Validators.required]],
      'establishmentName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'telephone': ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      'website': ['', [Validators.required, Validators.pattern("(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]")]],
      'type': ['', [Validators.required]],
      'operHours': this.fb.group({
        'day': ['', [Validators.required]],
        'openingTime': this.fb.group({
            'time': ['', [Validators.required]],
            'zone': ['', [Validators.required]]
        }),
        'closingTime': this.fb.group({
          'time': ['', [Validators.required]],
          'zone': ['', [Validators.required]]
        })
      })
    })
  }

  addEstablishment() {
    // console.log(this.addEstablishmentForm)
    let values = this.addEstablishmentForm.value
    values.location = this.location
    values.dateTime = this.days
    this.establishmentFormService.addNewEstablishment(values).subscribe(
      establishment => {
        console.log(establishment)
      },
      error => this.errorMessage = error
    )
    // console.log(values)
  }

}
