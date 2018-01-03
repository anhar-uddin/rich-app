import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

@Injectable()
export class OfflineBooks {

  data: any;
  db: any;
  isBook: boolean;

  constructor(public http: Http) {
    this.db = new PouchDB('RCHBooks');
    console.log('Hello OfflineBooks Provider');
  }

  storeLocalBooks(id, chapters, description, title) {
    return new Promise(resolve => {
      this.db.put({
        _id: id,
        type: "book",
        title: title,
        description: description,
        chapters: chapters,
        img: ""
      }).then(function (response) {
        // handle response
        resolve("success");
      }).catch(function (err) {
        console.log(err);
        resolve("error");
      });
    });
  }

  getLastStoredBook() {
    return new Promise(resolve => {
      //returns all docs
      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];
        // loop through all docs
        let docs = result.rows.map((row) => {
          // if doc type is event add to array 
          if (row.doc.type === "book") {

            this.data.push(row.doc);

          }
        });

        var lastBook = this.data[this.data.length - 1];

        console.log("last", lastBook);

        resolve(lastBook);

      }).catch((error) => {

        console.log(error);

      });

    });
  }


  getOfflineBooks() {
    return new Promise(resolve => {
      //returns all docs
      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];
        // loop through all docs
        let docs = result.rows.map((row) => {
          // if doc type is event add to array 
          if (row.doc.type === "book") {

            this.data.push(row.doc);

          }
        });

        resolve(this.data);

      }).catch((error) => {

        console.log(error);

      });

    });
  }


  isBooksOffline() {
    return new Promise(resolve => {
      //returns all docs
      this.db.allDocs({

        include_docs: true

      }).then((result) => {
        this.isBook = false;
        // loop through all docs
        let docs = result.rows.map((row) => {
          // if doc type is event add to array 
          if (row.doc.type === "book") {
            this.isBook = true;
          }
        });

        resolve(this.isBook);


      }).catch((error) => {

        console.log(error);

      });

    });
  }

  storeFavorites(book, chapterId, paragraph) {
    return new Promise(resolve => {

      this.db.post({
        type: "favorites",
        book: book,
        chapterId: chapterId,
        paragraph: paragraph
      }).then(function (response) {
        console.log(response);
        resolve("success");

        // handle response
      }).catch(function (err) {
        console.log(err);
        resolve("error");

      });
    })
  }

  getOfflineFavorites() {
    return new Promise(resolve => {
      //returns all docs
      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];
        // loop through all docs
        let docs = result.rows.map((row) => {
          // if doc type is event add to array 
          if (row.doc.type === "favorites") {

            this.data.push(row.doc);

          }
        });

        resolve(this.data);

      }).catch((error) => {

        console.log(error);

      });

    });
  }

  removeFavorites(favoriteId) {
    return new Promise(resolve => {
      this.db.get(favoriteId).then((doc) => {
        return this.db.remove(doc);
      }).then((result) => {
        // handle result
        resolve(true);
      }).catch((err) => {
        resolve(false);
      });
    });
  }

}
