import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassService } from '../class.service';
import { ClassDataService } from '../class-data.service';
import { Class } from '../class';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.css']
})
export class ListClassComponent implements OnInit {

  class: Observable<any>;
  del:boolean;

  constructor(private _classService: ClassService, private _classDataService: ClassDataService) { }

  ngOnInit() {
    this.class = this._classService.getAll();

  }
  delete(key: string) {
    if (window.confirm("Deseja realmente excluir essa Turma?")) {
      this._classService.delete(key);
      this.del = true;
    }
    
  }
  edit(turma: Class, key: string) {
    this._classDataService.getClass(turma, key);
  }

}
