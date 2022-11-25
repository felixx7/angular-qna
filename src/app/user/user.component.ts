import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData!: any[];

  constructor(private userService : UserService) { }

  ngOnInit():void{
    this.userService.getUser().subscribe((res)=>{
      this.userData = res
      // console.log(res)
    })

    let userObj = {
      name:"aditya",
      username:"felix",
      age:"30"
    }

    // this.userService.addUser(userObj).then((user)=>{
    //   if(user){
    //     console.log("berhasil")
    //     console.log(user)
    //   }
    // })

    let userObjUpdate = {
      id:"jgas",
      name:"aditya",
      username:"felix",
      age:"30"
    }

    // this.userService.updateUser(userObjUpdate).then((user)=>{
    //   console.log(user)
    // })

    let userObjDelete = {
      id:"jgas",
      name:"aditya",
      username:"felix",
      age:"30"
    }

    // this.userService.deleteUser(userObjDelete).then((user)=>{
    //   console.log(user)
    // })
  }

}
