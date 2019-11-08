import { PatientService } from './../patient.service';
import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../patient-data.service';
import { Patient } from '../patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  patient:Patient;
  key: string = '';
  registerForm:FormGroup;
  submitted = false;

  save:boolean;
  erro:boolean;


  public phone = ['(',  /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public value_payment = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/]
 
  
  constructor(
    private _pacientService: PatientService, 
    private _patientDataService: PatientDataService,
    private builder: FormBuilder) 
    { 
    }

  ngOnInit() {
    this.registerForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      begin: ['', Validators.required],
      value_payment: ['', Validators.required],
      payment: [false, Validators.required],
  })

    this.patient = new Patient();
    this._patientDataService.patientCurrent.subscribe(data =>{
      if(data.patient && data.key){
        this.patient = new Patient();
        this.patient.name = data.patient.name;
        this.patient.email = data.patient.email;
        this.patient.phone = data.patient.phone;
        this.patient.begin = data.patient.begin;
        this.patient.value_payment = data.patient.value_payment;
        this.patient.payment = data.patient.payment;
        this.key = data.key;
      }
    })
  }

  get f() { 
    return this.registerForm.controls; 
  }


  onSubmit(){
    
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.erro = true;
      return;
     
  }
    if(this.key){
      this.erro = false;
      this.save = true;
      this._pacientService.update(this.patient,this.key);
      this.submitted = false;
     

    }else{
      this.erro = false;
      this.save = true;
      this._pacientService.insert(this.patient);
      this.submitted = false;
      
    }
    this.patient = new Patient();
    this.key = null;
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.patient = new Patient();
    this.key = null;
}

}