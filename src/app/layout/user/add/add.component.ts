import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingState } from '../../../core/components/loading/loading.component';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  details: any;
  title: string;
  userId: number;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.title = "Update User"
    }
    else {
      this.title = "Add User"
    }
    this.details = {
      first_name: null,
      last_name: null,
      username: null,
      email: null,      
      phone_no: null,
      address: null,
      pin_code: null,
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],      
      phone_no: [false, [Validators.required]],
      address: [null, [Validators.required]],
      pin_code: [null, [Validators.required]],
    });
    if (this.userId) {
      this.loadData()
    }
    else{
      this.loading = LoadingState.Ready;
    }
    
  }

  loadData() {
    this.loading = LoadingState.Processing;
    var forkArray = [];
    forkArray.push(this.userService.getUserDetails(this.userId))
    forkJoin(forkArray).subscribe(
      ([details]) => {      
        if (details) {
          this.details = {
            first_name: details['data']['first_name'],
            last_name: details['data']['last_name'],
            username: null,
            email: details['data']['email'],      
            phone_no: null,
            address: null,
            pin_code: null,
          }
        }
        this.loading = LoadingState.Ready;

      },
      err => {
        console.log(err)
        if(err.status == 404){
          this.toastr.error('User Not Found', '', {
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
  }

  save() {
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.userId) {
        this.update()
      }
      else {
        this.loading = LoadingState.Processing
        var data = Object.assign({}, this.form.value)       
        this.userService.addUser(data).subscribe(
          res => {
            console.log(res)
            this.toastr.success(res['msg'], '', {
              timeOut: 3000,
            });
            this.router.navigateByUrl('/user');
            this.loading = LoadingState.Ready
          },
          error => {
            console.log(error)
            if(error.status == 404){
              this.toastr.error('User Not Found', '', {
                timeOut: 3000,
              });
            }
            else if(error.status == 400){
              this.toastr.error(error.error.error, '', {
                timeOut: 3000,
              });
            }
            else{
              this.toastr.error('Something went wrong', '', {
                timeOut: 3000,
              });
            }
            this.loading = LoadingState.Ready
          }
        )
      }

    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  update() {
    this.loading = LoadingState.Processing
    var data = Object.assign({}, this.form.value)
    this.userService.updateUser(this.userId, data).subscribe(
      res => {
        console.log(res)
        this.toastr.success(res['msg'], '', {
          timeOut: 3000,
        });
        this.router.navigateByUrl('/user');
        this.loading = LoadingState.Ready
      },
      error => {
        console.log(error)
        if(error.status == 404){
          this.toastr.error('User Not Found', '', {
            timeOut: 3000,
          });
        }
        else if(error.status == 400){
          this.toastr.error(error.error.error, '', {
            timeOut: 3000,
          });
        }
        else {
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
        this.loading = LoadingState.Ready
      }
    )
  }

  cancel() {
    this.location.back()
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
