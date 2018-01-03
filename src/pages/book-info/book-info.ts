import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ChaptersPage } from '../../pages/chapters/chapters';
import { OfflineBooks } from '../../providers/offline-books';

@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html'
})
export class BookInfoPage {

  book: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public offlineBooks: OfflineBooks, private alertCtrl: AlertController) {
    this.book = navParams.data.book;
  }

  ionViewDidLoad() {
  }

  // Opens selected book
  openBook(book) {
    this.navCtrl.push(ChaptersPage, { book: book });
  }
  
  // Downloads selected book
  downloadBook(book) {
    this.offlineBooks.storeLocalBooks(book.bookID, book.chapters, book.description, book.title).then(result => {
      console.log(result);
      if (result === "error") {
        let alert = this.alertCtrl.create({
          title: 'Error downloading',
          buttons: ['Dismiss']
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Book downloaded',
          buttons: ['Ok']
        });
        alert.present();
      }

    }).catch(err => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Error downloading',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

}
