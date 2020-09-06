import { MenuItem } from 'primeng/api';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogIn: boolean;

  constructor(private auth: AuthService) { 
    auth.user$.subscribe((user)=> {
      if (user)
        this.isLogIn = true;
      else
        this.isLogIn = false;
    })
  }

  ngOnInit(): void {
  }

  public async dangXuat() {
    await this.auth.signOut();
    console.log("Đăng xuất");
  }
}
