import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required])
    });
  }  

  loginProcess() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((result)=>{
        if(result.error) {
          alert(result.error)
        } else {
          // alert(result.user.name)
          localStorage.setItem("jwt", JSON.stringify(result))
          // localStorage.setItem("username", result.user.name)
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        alert(JSON.stringify(error.error))
      })
    } else {
      alert("Please Enter valid details.")
      this.loginForm.reset();
    }
  }

}
