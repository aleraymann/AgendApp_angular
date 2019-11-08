import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Class } from './class';
import { map } from 'rxjs/operators';
import { Patient } from '../patients/patient';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private _angularFireDatabase: AngularFireDatabase) { }
  private patientSource = new BehaviorSubject({patient:null, key:''});
  patientCurrent = this.patientSource.asObservable();

  insert(turma:Class){
    this._angularFireDatabase.list("class").push(turma)
    .then((result:any)=>{
      console.log(result.key);
    })
  }

  update(turma:Class, key:string){
    this._angularFireDatabase.list("class").update(key,turma);
  }

  getAll(){
    return this._angularFireDatabase.list("class")
      .snapshotChanges()
      .pipe(
        map(changes=>{
          return changes.map(data =>({ key:data.payload.key, ...data.payload.val() }))
        })
      )
  }
  delete(key:string){
    this._angularFireDatabase.object(`class/${key}`).remove();
    console.log(key);
  }

  getPatient(patient : Patient, key: string){
    this.patientSource.next({patient:patient, key:key});
  }
}
