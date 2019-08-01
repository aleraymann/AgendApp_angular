import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private db: AngularFireDatabase) { }

  insert(patient: Patient){
    this.db.list('patient').push(patient)
    .then((result: any) =>{
      console.log(result.key);
    });
  }
  update(patient: Patient, key: string){
    this.db.list('patient').update(key,patient)
    .catch((error: any) =>{
      console.error(error);
    });
  }
  getAll(){
    return this.db.list('contato')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c=>({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
  delete(key: string){
    this.db.object('patient/${key}').remove();
  }
}
