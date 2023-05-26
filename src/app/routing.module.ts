import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserDataTableComponent } from './pages/user-data-table/user-data-table.component';

const routes: Routes = [  
  { path: 'login', component: LoginComponent },
  { path: 'user-data-table', component: UserDataTableComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }