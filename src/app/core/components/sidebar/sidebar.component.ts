import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navigation: any = [];
  constructor(
  ) {
    this.loadMenu()
  }

  loadMenu(){
    this.navigation = [
      {
        title: 'Users',
        url: '/user',
        icon: '#icon_userlist'
      }
    ]
  }

  ngOnInit(): void {
    
  }

}
