import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { OfflineBooks } from '../../providers/offline-books';
import { ChaptersPage } from '../../pages/chapters/chapters';
import { BookInfoPage } from '../../pages/book-info/book-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: FirebaseListObservable<any>;
  booksList = [];
  offlineBooksList: any = [];
  booksSegments: string = "online";

  constructor(public navCtrl: NavController, public af: AngularFire, public offlineBooks: OfflineBooks) {
    this.books = af.database.list('/books');
    this.getAllBooks();
  }

  ionViewWillEnter() {
    this.offlineBooksList = [];
    this.getOfflineBooks();
  }

  // Get all books from firebase
  getAllBooks() {
    this.books.subscribe(items => {
      for (let book of items) {
        this.booksList.push({ bookID: book.$key, title: book.title, description: book.description, chapters: book.chapters })
      }
    });
  }

  // Get all books stored offline 
  getOfflineBooks() {
    this.offlineBooks.getOfflineBooks().then((data) => {
      console.log("offline books", data);
      for (let book in data) {
        console.log(data[book]); // 1, "string", false
        this.offlineBooksList.push({ bookID: data[book]._id, title: data[book].title, description: data[book].description, chapters: data[book].chapters })
      }
    });
  }

  // Open book and display on chapters page
  openBook(book) {
    this.navCtrl.push(ChaptersPage, { book: book });
  }

  // Download book and save to offline storage
  downloadBook(book) {
    this.offlineBooks.storeLocalBooks(book.bookID, book.chapters, book.description, book.title);
    this.offlineBooksList = [];
    this.getOfflineBooks();
  }

  // Open book information
  openBookInfo(book) {
    this.navCtrl.push(BookInfoPage, { book: book });
  }

  // TODO : Will be used in the future for sorting books 
  getBookByTitle() {
    this.books = this.af.database.list('/books', {
      query: {
        orderByChild: 'title',
        equalTo: "new"
      }
    });
    this.books.subscribe(items =>
      console.log(items));
  }

  // TODO : Will be used in the future for sorting books 
  getLastBook() {
    this.books = this.af.database.list('/books', {
      query: {
        limitToLast: 1,
      }
    });

    this.books.subscribe(items =>
      // items is an array
      console.log(items));
  }
}
