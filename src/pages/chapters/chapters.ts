import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, App } from 'ionic-angular';
import { OpenChapterPage } from '../../pages/open-chapter/open-chapter';
import { ElementRef, Renderer } from '@angular/core';

/*
  Generated class for the Chapters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html'
})
export class ChaptersPage {
  @ViewChild(Content) content: Content;

  book: any;
  start = 0;
  threshold = 10;
  slideHeaderPrevious = 0;
  ionScroll: any;
  showheader: boolean;
  hideheader: boolean;
  headercontent: any;
  chapters: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public myElement: ElementRef, public renderer: Renderer, public app: App) {
  }

  openChapter(chapterIndex, from) {
    console.log(chapterIndex);
    this.navCtrl.push(OpenChapterPage,
      {
        from: from,
        book: this.book,
        chapters: this.chapters,
        chapterIndex: chapterIndex
      });
  }

  openChapterFromFav(chapterIndex, from, paragraph) {
    this.navCtrl.push(OpenChapterPage,
      {
        from: from,
        book: this.book,
        chapters: this.chapters,
        chapterIndex: chapterIndex,
        paragraph: paragraph
      });
  }

  ionViewDidLoad() {
    if (this.navParams.data.from === "favourites") {
      this.book = this.navParams.data.book;
      this.openChapterFromFav(this.navParams.data.chapterIndex, "favourites", this.navParams.data.paragraph);
    } else {
      this.book = this.navParams.data.book;
      for (let entry in this.book.chapters) {
        this.chapters.push(this.book.chapters[entry]);
      }
      this.showheader = false;
      this.hideheader = true;
    }
  }


}
