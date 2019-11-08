import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';
import { ClassDataService } from '../class-data.service';
import { Observable } from 'rxjs';
import { PatientDataService } from 'src/app/patients/patient-data.service';
import { PatientService } from 'src/app/patients/patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  class:Class;
  key: string = '';
  patients: Observable<any>;
  classForm:FormGroup;
  submitted = false;

  save:boolean;
  erro:boolean;

  constructor(
    private _classService: ClassService, 
    private _classDataService: ClassDataService,
    private _patientService : PatientService, 
    private _patientDataService: PatientDataService,
    private builder: FormBuilder) { }

  ngOnInit() {
    this.patients = this._patientService.getAll();
    this.classForm = this.builder.group({
      day: ['', Validators.required],
      hour: ['', Validators.required],
      p1: ['', Validators.required],
      p2: ['', Validators.required],
      p3: ['', Validators.required],
      p4: ['', Validators.required],
  })
    this.class = new Class();
    this._classDataService.classCurrent.subscribe(data =>{
      if(data.turma && data.key){
        this.class  = new Class();
        this.class.day = data.turma.day;
        this.class.hour = data.turma.hour;
        this.class.p1 = data.turma.p1;
        this.class.p2 = data.turma.p2;
        this.class.p3 = data.turma.p3;
        this.class.p4 = data.turma.p4;
        this.key = data.key;

      }
    })
  }
  get f() { 
    return this.classForm.controls; 
  }

  onSubmit(){
    this.submitted = true;
    if (this.classForm.invalid) {
      this.erro = true;
     
      return;
  }
    if(this.key){
      this.erro = false;
      this.save = true;
      //window.alert("Editado com Sucesso!");
      this._classService.update(this.class,this.key);
      this.submitted = false;
    }else{
      this.erro = false;
      this.save = true;
      //window.alert("Salvo com Sucesso!");
      this._classService.insert(this.class);
      this.submitted = false;
    }
    this.class = new Class();
    this.key = null;
  }
  onReset() {
    this.submitted = false;
    this.classForm.reset();
    this.class = new Class();
    this.key = null;
}

}
