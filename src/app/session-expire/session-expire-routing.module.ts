import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionExpireComponent } from './session-expire.component';

const routes: Routes = [
  {
    path: '', component: SessionExpireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionExpireRoutingModule { }
