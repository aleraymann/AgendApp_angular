import { Component, OnInit } from '@angular/core';
import { Patient } from '../share/patient';
import { PatientService } from '../share/patient.service';
import { PatientDataService } from '../share/patient-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  patients: Observable<any>;

  constructor(private patientService:PatientService, private patientDataService:PatientDataService) { }

  ngOnInit() {
    this.patients = this.patientService.getAll();
  }
  
  delete(key: string){
    this.patientService.delete(key);
  }

  edit( patient, key: string){
    this.patientDataService.changePatient(patient,key);
  }

}
