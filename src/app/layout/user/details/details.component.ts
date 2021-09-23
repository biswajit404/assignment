import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingState } from '../../../core/components/loading/loading.component';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  form: FormGroup;
  loading: LoadingState = LoadingState.NotReady;
  details: any;
  title: string;
  userId: number;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.userId = this.route.snapshot.params['id'];
    
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
    this.loadData()    
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

  cancel() {
    this.location.back()
  }

}
