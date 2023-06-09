import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import {Sort} from '@angular/material/sort';
import userData from '../../dummy-data/data.json';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-data-table',
  templateUrl: './user-data-table.component.html',
  styleUrls: ['./user-data-table.component.css']
})
export class UserDataTableComponent implements OnInit{
  closeResult: string = '';
  idsToDelete: string[] = [];
  userData:UserData[] = userData;

  checkAll: boolean = false

  

  constructor(private userDataService: DataService, private modalService: NgbModal) {
   
  }

  ngOnInit() {
    

  }

  sortData(sort: Sort) {
    const data = this.userData.slice();
    if (!sort.active || sort.direction === '') {
      this.userData = data;
      return;
    }

    this.userData = data.sort((a: UserData, b: UserData) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'phone':
          return compare(a.phone, b.phone, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        default:
          return 0;
      }
    });
  }

  toggleAll(): void {
    for (let i = 0; i < this.userData.length; i++) {
      this.userData[i].checked = this.checkAll;
    }
    if (this.checkAll){
      for (let i = 0; i < this.userData.length; i++) {
        this.userData[i].checked = this.checkAll;
        this.idsToDelete.push(this.userData[i].id)
      }
    } else if (!this.checkAll){
      for (let i = 0; i < this.userData.length; i++) {
        this.userData[i].checked = this.checkAll;
        this.idsToDelete = []
      }
    }
  }

  onCheckSingle(value: string, element: HTMLInputElement){
    const id = value
    if(element.checked){
      this.idsToDelete.push(id)
    } else {
      if(this.idsToDelete.length > 1){
        let g= this.idsToDelete.findIndex(item => item == id)
        this.idsToDelete.splice(g, 1)
        this.checkAll = false
        return
      }
      let g = this.idsToDelete.indexOf(id)
      let removedId = this.idsToDelete.splice(g, 1)
      this.idsToDelete = removedId
      this.checkAll = false
    }
  }

  private deleteItem(id: string[]){
    let length = id.length
    if (length > 1){
      const idsArr = this.idsToDelete
      const arr = this.userData.filter(item => idsArr.indexOf(item.id) === -1);
      this.userData = arr
      this.checkAll = false
      this.userDataService.checkDeleteSuccess(true)
      this.idsToDelete = []
    } else {
      const idToDelete = id[0]

      const index = this.userData.findIndex(obj => obj.id === idToDelete);
      const newData = [
        ...this.userData.slice(0, index),
        ...this.userData.slice(index + 1)
      ]
      this.userData = newData
      this.userDataService.checkDeleteSuccess(true)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.userData, event.previousIndex, event.currentIndex);
  }

  open(content:any, id: string[]) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'my__modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteItem(id)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export interface UserData {
  checked:boolean, 
  name:string, 
  phone:string, 
  email:string, 
  options:string, 
  id: string
}