
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isDeleted: boolean = false
  isDeleteSuccess = new Subject<boolean>()

  constructor() { }
  checkDeleteSuccess(value: boolean){
    this.isDeleteSuccess.next(value)
  }
  
}