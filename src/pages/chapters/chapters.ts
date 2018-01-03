import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, App } from 'ionic-angular';
import { OpenChapterPage } from '../../pages/open-chapter/open-chapter';
import { ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html'
})
export class ChaptersPage {
  book: any;
  chapters: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if (this.navParams.data.from === "favorites") {
      this.book = this.navParams.data.book;
      this.openChapterFromFav(this.navParams.data.chapterIndex, "favorites", this.navParams.data.paragraph);
    } else {
      this.book = this.navParams.data.book;
      for (let entry in this.book.chapters) {
        this.chapters.push(this.book.chapters[entry]);
      }
      this.showheader = false;
      this.hideheader = true;
    }
  }

  // Opens selected chapter
  openChapter(chapterIndex, from) {
    this.navCtrl.push(OpenChapterPage,
      {
        from: from,
        book: this.book,
        chapters: this.chapters,
        chapterIndex: chapterIndex
      });
  }

  // Opens selected favorites 
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
}
