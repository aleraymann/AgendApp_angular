import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from './patient';



@Injectable({
  providedIn: 'root'
})
export class PatientDataService {
  private patientSource = new BehaviorSubject({ patient: null, key : ''});
  currentPatient = this.patientSource.asObservable();

  constructor() {}

  changePatient(patient:Patient, key: string){
    this.patientSource.next({patient: Patient, key:key});
  }
}
