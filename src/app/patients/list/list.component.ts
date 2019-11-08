import { PatientDataService } from './../patient-data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  patients: Observable<any>;
  del:boolean;

  constructor(private _patientService : PatientService, private _patientDataService: PatientDataService) { }

  ngOnInit() {
    this.patients = this._patientService.getAll();
    
  }
  delete(key: string){
    if (window.confirm("Deseja realmente excluir esse paciente?")) { 
      this._patientService.delete(key);
      this.del = true;
    }
    
  }
  edit(patient:Patient, key: string){
    this._patientDataService.getPatient(patient,key);
    
  }
  

}