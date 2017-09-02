import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfflineBooks } from '../../providers/offline-books';
import { ChaptersPage } from '../../pages/chapters/chapters';

/*
  Generated class for the Favourites page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html'
})
export class FavouritesPage {
  favoritesList: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public offlineBooks: OfflineBooks) {
  }

  getFavourites() {
    this.offlineBooks.getOfflineFavourites().then((data) => {
      console.log("offline books", data);
      for (let book in data) {
        var title = data[book].book.title + " " + (data[book].chapterId + 1);
        this.favoritesList.push({ id: data[book]._id, book: data[book].book, chapterIndex: data[book].chapterId, paragraph: data[book].paragraph, chapters: data[book].book.chapters, title: title })
      }
    });
  }

  removeFavourites(id) {
    this.offlineBooks.removeFavourites(id).then((result) => {
      if (result) {
        var favFromList = this.favoritesList.find(o => o.id === id)
        var indexOfFavFromList = this.favoritesList.indexOf(favFromList);
        this.favoritesList.splice(indexOfFavFromList, 1);
      }
    }).catch(err => {

    });
  }

  openFavourites(favourites) {
    console.log(favourites);


    this.navCtrl.push(ChaptersPage,
      {
        from: "favourites",
        book: favourites["book"],
        chapterIndex: favourites["chapterIndex"],
        paragraph: favourites["paragraph"]
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }

  ionViewWillEnter() {
    this.favoritesList = [];

    this.getFavourites();

  }

}
