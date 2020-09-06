import { AuthService } from './../../services/auth/auth.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dang-ky',
  templateUrl: './dang-ky.component.html',
  styleUrls: ['./dang-ky.component.css']
})
export class DangKyComponent implements OnInit {
  public dangKyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { 
  }

  ngOnInit(): void {
    this.dangKyForm = this.formBuilder.group({
      email: ["",[
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required,
      ]]
    });

    // this.dangKyForm.valueChanges.subscribe((data) => console.log(data));
  }

  get email() {return this.dangKyForm.get("email")}
  get password() {return this.dangKyForm.get("password")}

  dangKy() {
    this.auth.signUp(this.email.value, this.password.value);
  }
}
