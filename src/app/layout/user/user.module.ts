import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [UserComponent, AddComponent, DetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule
  ]
})
export class UserModule { }
