import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserData } from './user.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { AuthServiceService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  formValue!:FormGroup
  userModelObj: UserData = new UserData();
  AllUsers:any;
  showAdd!:boolean
  showUpdate!:boolean
  modalTitle:any
  userName:any
  name: any
  private maxAge: number = 5000;

  constructor(private formBuilder:FormBuilder, private api: ApiService, private router:Router, private sessionService: SessionService, private authServiceService:AuthServiceService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      age:[''],
      password: ['']
    }) 
    
    this.getUsers()
    this.getCurrentUserName()
    
    this.sessionService.startTimer(this.maxAge, this.logout);

    // Listen for user activity events to reset the timer
    // window.addEventListener('mousemove', this.resetAutoLogoutTimer);
    // window.addEventListener('keydown', this.resetAutoLogoutTimer);
  }

  ngOnDestroy() {
    this.sessionService.stopTimer();
  }

  getCurrentUserName() {
    const { user } = this.authServiceService.isAuthenticated();
    this.userName = user ? user.name : "User";
  }

  clickAddUser() {
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
    this.modalTitle='Add User'
  }

  // Subscribing the data which is mapped via services...
  addUser() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.age = this.formValue.value.age;
    this.userModelObj.password = this.formValue.value.password;

    this.api.postUser(this.userModelObj).subscribe(res=>{
      console.log(res);
      alert("User Added Successfully.!")
      this.formValue.reset();
      this.getUsers();
    },
    err => {
      console.log(err)
      alert("Oh no..! Something went wrong.")
    })
  }

  getUsers() {
    this.api.getUser().subscribe(res=>{
      this.AllUsers = res;
    })
  }

  deleteUser(user:any) {
    this.api.deleteUser(user.id).subscribe(res=>{
      alert("Success.!\nUser "+user.name+" deleted successfully.")
      this.getUsers();
    }, err => {
      alert("Error! Something went wrong.\nUnable to Delete User: "+user.name)
    })
  }

  loadCurrentUser(user:any) {
    this.showAdd=false;
    this.showUpdate=true;
    this.modalTitle='Update User Details'
    this.userModelObj.id = user.id;
    this.formValue.controls['name'].setValue(user.name);
    this.formValue.controls['email'].setValue(user.email);
    this.formValue.controls['age'].setValue(user.age);
    this.formValue.controls['password'].setValue(user.password);
  }

  updateUser() {

    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.age = this.formValue.value.age;
    this.userModelObj.password = this.formValue.value.password;

    this.api.updateUser(this.userModelObj, this.userModelObj.id).subscribe(user => {
      alert("User details updated successfully.")
      this.getUsers();
    })
  }

  private logout = () => {
    const confirm = window.confirm('Your session is about to expire. Do you want to continue.?');
    // Implement logic to handle user's decision (e.g., logout or refresh token)
    if (!confirm) {
      this.authServiceService.logout();
    } else {
      // Reset the timer and continue the session
      this.sessionService.resetTimer();
      this.sessionService.startTimer(this.maxAge, this.logout);
    }
  }

  logoutBtn() {
    this.authServiceService.logout();
  }
}
