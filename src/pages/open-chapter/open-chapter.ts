import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, PopoverController, NavController, Content, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { OfflineBooks } from '../../providers/offline-books';

@Component({
  selector: 'page-open-chapter',

  template: `
    <ion-list radio-group [(ngModel)]="fontFamily" (ionChange)="changeFontFamily()" class="popover-page">
      <ion-row>
        <ion-col>
          <button (click)="changeFontSize('smaller')" ion-item detail-none class="text-button text-smaller">A</button>
        </ion-col>
        <ion-col>
          <button (click)="changeFontSize('larger')" ion-item detail-none class="text-button text-larger">A</button>
        </ion-col>
      </ion-row>
      <ion-row class="row-dots">
        <ion-col>
          <button (click)="changeBackground('white')" category="dot" class="dot-white" [class.selected]="background == 'white'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('tan')" category="dot" class="dot-tan" [class.selected]="background == 'tan'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('grey')" category="dot" class="dot-grey" [class.selected]="background == 'grey'"></button>
        </ion-col>
        <ion-col>
          <button (click)="changeBackground('black')" category="dot" class="dot-black" [class.selected]="background == 'black'"></button>
        </ion-col>
      </ion-row>
      <ion-item class="text-athelas">
        <ion-label>Athelas</ion-label>
        <ion-radio value="Athelas"></ion-radio>
      </ion-item>
      <ion-item class="text-charter">
        <ion-label>Charter</ion-label>
        <ion-radio value="Charter"></ion-radio>
      </ion-item>
      <ion-item class="text-iowan">
        <ion-label>Iowan</ion-label>
        <ion-radio value="Iowan"></ion-radio>
      </ion-item>
      <ion-item class="text-palatino">
        <ion-label>Palatino</ion-label>
        <ion-radio value="Palatino"></ion-radio>
      </ion-item>
      <ion-item class="text-san-francisco">
        <ion-label>San Francisco</ion-label>
        <ion-radio value="San Francisco"></ion-radio>
      </ion-item>
      <ion-item class="text-seravek">
        <ion-label>Seravek</ion-label>
        <ion-radio value="Seravek"></ion-radio>
      </ion-item>
      <ion-item class="text-times-new-roman">
        <ion-label>Times New Roman</ion-label>
        <ion-radio value="Times New Roman"></ion-radio>
      </ion-item>
    </ion-list>
  `
})

export class PopoverPage {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };


  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(this.contentEle.style.backgroundColor);
      this.setFontFamily();
    }
  }

  getColorName(background) {
    let colorName = 'white';

    if (!background) return 'white';

    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    }
  }

  changeBackground(color) {
    this.background = color;
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    this.textEle.style.color = this.colors[color].fg;
  }

  changeFontSize(direction) {
    this.textEle.style.fontSize = direction;
  }

  changeFontFamily() {
    if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }
}

@Component({
  selector: 'page-open-chapter',
  templateUrl: 'open-chapter.html'
})

export class OpenChapterPage {
  chapter: any;
  chapterIndex: any;
  book: any;
  paragraphs: any[] = [];
  chapters: any[] = [];
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  @ViewChild(Content) pageContent: Content;

  constructor(private popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public offlineBooks: OfflineBooks, private alertCtrl: AlertController) {
    this.book = navParams.data.book;
    this.chapterIndex = navParams.data.chapterIndex;
    this.chapters = navParams.data.chapters;
    this.chapter = this.chapters[this.chapterIndex];
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });

    popover.present({
      ev: ev
    });
  }

  ionViewDidLoad() {
    if (this.navParams.data.from === "favorites") {
      this.goToFav(this.navParams.data.paragraph)
    }
  }

  previousChapter() {
    if (this.chapterIndex === 0) {

    } else {
      this.chapterIndex = this.chapterIndex - 1;
      this.chapter = this.chapters[this.chapterIndex];
    }
  }

  nextChapter() {
    // console.log("length", this.book["chapters"].length);
    console.log("this.chapterIndex", this.chapterIndex);

    if ((this.chapters.length - 1) === this.chapterIndex) {

    } else {
      this.chapterIndex = this.chapterIndex + 1;
      this.chapter = this.chapters[this.chapterIndex];
      console.log(this.chapters);

      console.log("fkejhkj");

    }
  }

  tapEvent(event, paragraph) {
    console.log(paragraph);
    this.presentActionSheet(this.book, this.chapterIndex, paragraph);
  }

  presentActionSheet(book, chapterIndex, paragraph) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Save to favorites',
      buttons: [
        {
          text: 'Save',
          role: 'save',
          handler: () => {
            console.log('Destructive clicked');
            this.offlineBooks.storeFavorites(book, chapterIndex, paragraph).then(result => {
              if (result === "error") {
                let alert = this.alertCtrl.create({
                  title: 'Error saving',
                  buttons: ['Dismiss']
                });
                alert.present();
              } else {
                let alert = this.alertCtrl.create({
                  title: 'Saved to favorites',
                  buttons: ['Ok']
                });
                alert.present();
              }
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // TODO: Save paragraph to favorite 
  saveToFav() {
    let number = document.getElementById("arabicAnd complete the Hajj and 'Umrah for Allah.");
    var position = number.getBoundingClientRect();
    console.log(number.getBoundingClientRect());
    this.pageContent.scrollTo(position.right, (position.top - 100));
  }

  // TODO: Got to favorite paragraph 
  goToFav(id) {
    let number = document.getElementById(id);
    var position = number.getBoundingClientRect();
    console.log(number.getBoundingClientRect());
    this.pageContent.scrollTo(position.right, (position.top - 100));
  }
}
