import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../shared/register';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  createForm() {
    this.registerForm = this.fb.group({
      usernamename: '',
      password:'',
      contact: 0,
      email: '',
      address:''
    });
  }

  onSubmit() {
    this.registerForm.reset();
  }

  moreThan24Hours: CountdownConfig = {
    leftTime: 120 * 60 * 60,
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
            return v.toString().padStart(match.length, '0');
          });
        }
        return current;
      }, formatStr);
    },
  };
  

}
