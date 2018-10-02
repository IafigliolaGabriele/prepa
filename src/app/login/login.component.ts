import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';

class Book {
  constructor(public title) { }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public books: AngularFireList<Book>;

  constructor(db: AngularFireDatabase) { 
    this.books = db.list('/books');
  }

  ngOnInit() {
    this.AddBook()
  }

  public AddBook(): void {
    let newBook = new Book('My book');
    this.books.push(newBook);
}

}
