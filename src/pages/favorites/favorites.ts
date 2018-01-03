import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfflineBooks } from '../../providers/offline-books';
import { ChaptersPage } from '../../pages/chapters/chapters';

/*
  Generated class for the Favorites page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  favoritesList: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public offlineBooks: OfflineBooks) {
  }

  // Get all favorites from offline storage and store in list.
  getFavorites() {
    this.offlineBooks.getOfflineFavorites().then((data) => {
      for (let book in data) {
        var title = data[book].book.title + " " + (data[book].chapterId + 1);
        this.favoritesList.push({ id: data[book]._id, book: data[book].book, chapterIndex: data[book].chapterId, paragraph: data[book].paragraph, chapters: data[book].book.chapters, title: title })
      }
    }).catch(err => {
      console.log(err);
    });
  }

  // Removes favorites form list
  removeFavorites(id) {
    this.offlineBooks.removeFavorites(id).then((result) => {
      if (result) {
        var favFromList = this.favoritesList.find(o => o.id === id)
        var indexOfFavFromList = this.favoritesList.indexOf(favFromList);
        this.favoritesList.splice(indexOfFavFromList, 1);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  // Opens favorites
  openFavorites(favorites) {
    this.navCtrl.push(ChaptersPage,
      {
        from: "favorites",
        book: favorites["book"],
        chapterIndex: favorites["chapterIndex"],
        paragraph: favorites["paragraph"]
      }
    );

  }
  
  ionViewWillEnter() {
    this.favoritesList = [];
    this.getFavorites();
  }

}
