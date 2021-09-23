import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getCookie, deleteAllCookies } from '../../helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetails: any = {
    name: "",
    email: "",
    profile_img: "assets/img/dummy-profile-img.jpg"
  }
  search_key: string = "";
  constructor(
    private router: Router
  ) {
    this.loadData()
    console.log(this.userDetails)
  }

  loadData(){
  }

  ngOnInit(): void {
  }

  autoSearch($event) {
    if ($event.keyCode == 13) {
      this.router.navigate(['/docs'],{ queryParams: { search: $event.target.value }});
    }
    else {
      $event.preventDefault();
    }
  }

  clearSearch(){
    this.search_key = ""
    this.router.navigate(['/docs'],{ queryParams: { slug: btoa('my_files') }});
  }

  logout() {
    deleteAllCookies();
    this.router.navigate(['/login']);
  }

  goTo(slug){
    this.router.navigate(['/docs'],{ queryParams: { slug: btoa(slug) }});  
  }

  searchStatus: boolean = false;
  searchToggle(){
    this.searchStatus = !this.searchStatus;       
  }

  navStatus: boolean = false;
  navToggle(){
    this.navStatus = !this.navStatus;       
  }

}
