import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';

class Book {
  constructor(public title) { }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public books: Observable<any[]>;
  public bookRef:any;
  constructor(private db: AngularFireDatabase, public authService: AuthService) { 
    this.bookRef = db.list('users')
    this.books = this.bookRef.valueChanges();
  }

  onSubmit(data){
    console.log("Submit",data);
    this.authService.doLogin(data);
  }

  ngOnInit() {
   // this.AddBook()
  }

  public addBook(): void {
    //let newBook = new Book('My book');
    //this.bookRef.push(newBook);
    this.books.forEach(book=>{
      book.forEach(element => {
        console.log("Element",element)
      });
    })
    //this.books.push(newBook);
}

}
