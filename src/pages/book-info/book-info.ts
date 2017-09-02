import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ChaptersPage } from '../../pages/chapters/chapters';
import { OfflineBooks } from '../../providers/offline-books';

/*
  Generated class for the BookInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
    console.log('ionViewDidLoad BookInfoPage');

  }

  openBook(book) {

    this.navCtrl.push(ChaptersPage, { book: book });
    console.log(book);

  }

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


    });
  }

}
