import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.css']
})
export class DangNhapComponent implements OnInit {
  public dangNhapForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { 
  }

  ngOnInit(): void {
    this.dangNhapForm = this.formBuilder.group({
      email: ["",[
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required,
      ]]
    });

    // this.dangNhapForm.valueChanges.subscribe((data) => console.log(data));
  }

  get email() {return this.dangNhapForm.get("email")}
  get password() {return this.dangNhapForm.get("password")}

  dangNhap() {
    this.auth.signIn(this.email.value, this.password.value);
  }
}
