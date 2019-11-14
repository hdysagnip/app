import { Component} from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  private userName:String;
  private userAge:Number = 0;
  private users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data)=> {
      this.users = data;
    })
  }

  addUser(){
    const user = new User();
    user.name = this.userName;
    user.age = this.userAge;
    this.userService.addUser(user).subscribe((data)=>{
        console.log(data);
        this.getUsers();
        alert("User has been added!");
        this.userName = "";
        this.userAge=0;
      }
    )
  }

  deleteUser(id){
      this.userService.deleteUser(id).subscribe((data)=>{
        console.log(data);
        this.getUsers();
        alert("User Deleted!");
        }
      )
  }

  updateUser(id){
      const user = new User();
      user.name = this.userName;
      user.age = this.userAge;
        this.userService.updateUser(user, id).subscribe((data)=>{
          console.log(data);  
          this.getUsers();
          alert("User was updated!");
          this.userName = "";
          this.userAge = 0;
        }
      )
  }
}
