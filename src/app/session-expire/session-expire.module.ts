import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { SessionExpireRoutingModule } from './session-expire-routing.module';
import { SessionExpireComponent } from './session-expire.component';


@NgModule({
  declarations: [SessionExpireComponent],
  imports: [
    CommonModule,
    SessionExpireRoutingModule,
    CoreModule
  ]
})
export class SessionExpireModule { }
