import { Patient } from './patient';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _angularFireDatabase: AngularFireDatabase) { }

  insert(patient:Patient){
    this._angularFireDatabase.list("patients").push(patient)
    .then((result:any)=>{
      console.log(result.key);
    })
    
  }

  update(patient:Patient, key:string){
    this._angularFireDatabase.list("patients").update(key,patient);
  }

  getAll(){
    return this._angularFireDatabase.list("patients")
      .snapshotChanges()
      .pipe(
        map(changes=>{
          return changes.map(data =>({ key:data.payload.key, ...data.payload.val() }))
          //return changes.map(data =>({ key:data.payload.key, ...data.payload.val() })).sort((a, b) => (a < b) ? -1 : 1)
        })
      )
      
      

  }
  delete(key:string){
    this._angularFireDatabase.object(`patients/${key}`).remove();
    console.log(key);
  }
}