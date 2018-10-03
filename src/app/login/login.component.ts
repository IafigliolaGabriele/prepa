import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

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
  constructor(db: AngularFireDatabase) { 
    this.bookRef = db.list('books')
    this.books = this.bookRef.valueChanges();
  }

  onSubmit(data){
    console.log("Submit",data);
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
