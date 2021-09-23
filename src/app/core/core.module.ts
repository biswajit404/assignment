import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
// Services
import { InterceptorService } from './services/interceptor.service';
import { UserService } from './services/user.service';
// Components
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SvgPathComponent } from './components/svg-path/svg-path.component';
import { ItemPerPageComponent } from './components/item-per-page/item-per-page.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ErrorComponent,
    LoadingComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SvgPathComponent,
    ItemPerPageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule,
    LoadingComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SvgPathComponent,
    ItemPerPageComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class CoreModule { 
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
        UserService
      ]
    }
  }
}
