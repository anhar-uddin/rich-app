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
      // this.books = af.database.list('/books');

      // /* check if any book has been downloaded - we will check if the database has any rows*/
      // this.offlineBooks.isBooksOffline().then((data) => {
      //   console.log(data);
        
      //   if (data) {     
      //     /* books exist - check if any new books have been added to the firebase database */
      //     console.log("books in database");

      //     this.checkForNewBook();
      //   } else {

      //     console.log("no books exists");
      //     /* no books exist in database. download books from firebase */
      //     this.getAllBooks();

      //   }
      // });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

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

  checkForNewBook() {
    console.log("check for new books");
    this.books = this.af.database.list('/books', {
      query: {
        limitToLast: 1,
      }
    });

    this.books.subscribe(book => {
      // last id of book from firebase
      var firbaseLastBookId = book[0].$key;

      //get last id of book on pouch 
      this.offlineBooks.getLastStoredBook().then((data) => {
        /* if ids are the same then no new book has been added */
        if (data["_id"] === firbaseLastBookId) {
          /* ids same so no new book has been added.  push to books page */

        } else {
          /* a new book had been added. add to the pouch database */
          this.offlineBooks.storeLocalBooks(book.$key, book.chapters, book.description, book.title)

        }

      });

    });

  }

}
