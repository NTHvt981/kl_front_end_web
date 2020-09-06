import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-them-quan-tri',
  templateUrl: './them-quan-tri.component.html',
  styleUrls: ['./them-quan-tri.component.css']
})
export class ThemQuanTriComponent implements OnInit {
  public dangKyForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { 
  }

  ngOnInit(): void {
    this.dangKyForm = this.formBuilder.group({
      email: ["",[
        Validators.required,
        Validators.email
      ]]
    });

    // this.dangKyForm.valueChanges.subscribe((data) => console.log(data));
  }

  get email() {return this.dangKyForm.get("email")}

  themQuanTri() {
    this.auth.setAdmin(this.email.value);
  }
  xoaQuanTri() {
    
  }
}
