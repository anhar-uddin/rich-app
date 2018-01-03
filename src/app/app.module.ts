import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { OfflineBooks } from '../providers/offline-books';
import { ChaptersPage } from '../pages/chapters/chapters';
import { OpenChapterPage } from '../pages/open-chapter/open-chapter';
import { PopoverPage } from '../pages/open-chapter/open-chapter';
import { FavoritesPage } from '../pages/favorites/favorites';
import { BookInfoPage } from '../pages/book-info/book-info';
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

// AF2 Settings
export const firebaseConfig = {
   apiKey: "AIzaSyBDq0_uLCpdQL_lkG6bHe6oHYQC9oBTqRE",
    authDomain: "rch-app.firebaseapp.com",
    databaseURL: "https://rch-app.firebaseio.com",
    storageBucket: "rch-app.appspot.com",
    messagingSenderId: "715129078876"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ChaptersPage,
    OpenChapterPage,
    PopoverPage,
    FavoritesPage,
    BookInfoPage,
    ParallaxHeader
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ChaptersPage,
    OpenChapterPage,
    PopoverPage,
    FavoritesPage,
    BookInfoPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, OfflineBooks]
})
export class AppModule { }
