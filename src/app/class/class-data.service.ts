import { Injectable } from '@angular/core';
import { Class } from './class';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassDataService {

  constructor() { }
  private classSource = new BehaviorSubject({turma:null, key:''});
  classCurrent = this.classSource.asObservable();

  getClass(turma : Class, key: string){
    this.classSource.next({turma:turma, key:key});
  }
}
