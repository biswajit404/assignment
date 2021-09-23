import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'add', component: AddComponent
  },
  {
    path: 'edit/:id', component: AddComponent
  },
  {
    path: 'details/:id', component: DetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
