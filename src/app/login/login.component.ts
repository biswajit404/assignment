import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingState } from '../core/components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { setCookie, getCookie } from '../core/helper'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  queryParams: any;
  url: string;
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if(params['url'] != undefined){
        this.url = params['url']
      }
      this.queryParams = Object.assign({},params)
    })
    delete this.queryParams['url']
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: [null, [Validators.required]],
      rememberme: [false],
    });
    if(getCookie('remember')) {
      this.form.patchValue({
        email: getCookie('email'),
        password: getCookie('password'),
        rememberme: getCookie('remember'),
      })
    }
    this.loading = LoadingState.Ready
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = LoadingState.Processing
      var data = {
        email: this.form.value.email,
        password: this.form.value.password,
      }
      this.userService.login(data).subscribe(
        res => {
          console.log(res)
          this.toastr.success('Login Successfully', '', {
            timeOut: 3000,
          });          
          setCookie('isLoggedin', 'true');
          setCookie('loggedinToken', res['token'])
          this.loading = LoadingState.Ready;
          if(this.url != undefined){
            if(Object.keys(this.queryParams).length > 0){
              this.router.navigate([this.url],{ queryParams: this.queryParams});
            }
            else{
              this.router.navigate([this.url]);
            }
            
          }
          else{
            this.router.navigate(['/']);
          }
          setCookie('email',this.form.value.email);
          setCookie('password',this.form.value.password);
          setCookie('remember',this.form.value.rememberme);          
        },
        error => {
          console.log(error)
          if(error.status == 400){
            this.toastr.error(error.error.error, '', {
              timeOut: 3000,
            });
          }
          else{
            this.toastr.error('Something went wrong', '', {
              timeOut: 3000,
            });
          }          
          this.loading = LoadingState.Ready;
        }
      )
    } else {
      this.markFormGroupTouched(this.form);
    }
  }


  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'is-invalid': form.get(field).invalid && (form.get(field).dirty || form.get(field).touched),
      'is-valid': form.get(field).valid && (form.get(field).dirty || form.get(field).touched)
    };
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && (form.get(field).dirty || form.get(field).touched);
  }

}
