import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   usersList:User[]=[];
   selectedUser:User|undefined;
  constructor(private userService:UserService){

  }
  //to get the userList from API
  getUsersList()
  {
  
    this.userService.getUsers().subscribe((data:User[])=>{
    console.log(data);
    this.usersList=data;
  });
  }
//to add and update the user 
  addAndUpdateUser(user:User)
  {
    if(!this.selectedUser)
    {
      //to add the user
      this.userService.saveUser(user).subscribe((data:User)=>{
        // console.log(data);
        if(data){
          this.getUsersList();
        }
      });
    }
    else
    {
      //to update the user with id
      const userData={...user,id:this.selectedUser.id};
      this.userService.updateUser(userData).subscribe((data:User)=>{
        if(data)
        {
          this.getUsersList();
        }
      });
      

    }
  }
  //to delete the user from API with id
  deleteUser(id:string)
  {
    this.userService.deleteUser(id).subscribe((data:User)=>{
      console.log(data);
      if(data)
      {
        this.getUsersList();
      }
    });
  }
  selectUser(id:string)
  {
    this.userService.getSelectedUser(id).subscribe((data:User)=>
    {
      console.log(data)
      this.selectedUser=data;
    });
  }
}
