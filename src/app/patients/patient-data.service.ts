import { Patient } from './patient';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  constructor() { }

  private patientSource = new BehaviorSubject({patient:null, key:''});
  patientCurrent = this.patientSource.asObservable();

  getPatient(patient : Patient, key: string){
    this.patientSource.next({patient:patient, key:key});
  }
}