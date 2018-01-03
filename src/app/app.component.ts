import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { OfflineBooks } from '../providers/offline-books';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  books: FirebaseListObservable<any>;
  rootPage = TabsPage;

  constructor(platform: Platform, public af: AngularFire, public offlineBooks: OfflineBooks) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  // TODO: Will be used to get all books on app load 
  getAllBooks() {
    this.books.subscribe(items => {
      // items is an array
      console.log(items)
      for (let book of items) {
        console.log(book); // 1, "string", false
        this.offlineBooks.storeLocalBooks(book.$key, book.chapters, book.description, book.title)
      }
    });

  }

  // TODO: Will be used to get all books on app load 
  checkForNewBook() {
    console.log("check for new books");
    this.books = this.af.database.list('/books', {
      query: {
        limitToLast: 1,
      }
    });

    this.books.subscribe(book => {
      // last id of book from firebase
      var firebaseLastBookId = book[0].$key;
      //get last id of book on pouch 
      this.offlineBooks.getLastStoredBook().then((data) => {
        /* if ids are the same then no new book has been added */
        if (data["_id"] === firebaseLastBookId) {
          /* ids same so no new book has been added.  push to books page */
        } else {
          /* a new book had been added. add to the pouch database */
          this.offlineBooks.storeLocalBooks(book.$key, book.chapters, book.description, book.title)
        }
      });
    });

  }

}
