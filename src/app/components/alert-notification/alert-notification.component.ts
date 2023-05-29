import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-alert-notification',
  templateUrl: './alert-notification.component.html',
  styleUrls: ['./alert-notification.component.css']
})
export class AlertNotificationComponent  implements OnInit, OnDestroy{

  notificationMessage: string = ''

  private loginSuccess!: Subscription;
  private isDeleteSuccess!: Subscription;

  showNotification: boolean = false;

  constructor(private authService: AuthService, private dataService: DataService){
    
  }
  
  ngOnInit():void{
    this.loginSuccess = this.authService.loginSuccess.subscribe(res => {
      this.showNotification = res
      this.notificationMessage = 'Login Successfully'
      setTimeout(()=>{
        this.onAlertClosed()
      }, 5000)
    })

    this.isDeleteSuccess = this.dataService.isDeleteSuccess.subscribe(res => {
      this.showNotification = res
      this.notificationMessage = 'Deleted Successfully'
      setTimeout(()=>{
        this.onAlertClosed()
      }, 5000)
    })

  
  }

  onAlertClosed(){
    this.showNotification = false;
  }

  ngOnDestroy(){
    this.loginSuccess.unsubscribe()
    this.isDeleteSuccess.unsubscribe()
  }
}
