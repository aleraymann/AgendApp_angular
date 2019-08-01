import { Component, OnInit } from '@angular/core';
import { Patient } from '../share/patient';
import { PatientService } from '../share/patient.service';
import { PatientDataService } from '../share/patient-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  patient: Patient
  key: string= '';

  constructor(private patientService:PatientService, private patientDataService:PatientDataService) { }

  ngOnInit() {
    this.patient = new Patient();
    this.patientDataService.currentPatient.subscribe(data =>{
      if(data.patient && data.key){
      this.patient = new Patient();
      this.patient.name = data.patient.name;
      this.patient.email = data.patient.email;
      this.patient.phone = data.patient.phone;
      this.patient.cpf = data.patient.cpf;
      this.patient.value_payment = data.patient.value_payment;
      this.patient.begin = data.patient.begin;
      this.key = data.key;
      }
    })
  }

  onSubmit(){
    if(this.key){
      this.patientService.update(this.patient, this.key);

    }else{
      this.patientService.insert(this.patient);
    }
    this.patient = new Patient();
  }

}
