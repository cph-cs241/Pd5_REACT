import { observable, useStrict, action } from "mobx"

useStrict(true);

//DataStore for this Demo
class BookStore {

  @observable _books = [];

  constructor() {
    this.fetchBooks();
  }

  //get all books
  get books() {
    return this._books;
  }

  //individual books
  getBook(id) {
    return this._books.filter((book) => {
      return book.id === Number(id);
    })[0];
  }

  //edit a book
  @action
  changeBooks(id) {
    this._books.replace(id);
  }

  //add a new book
  @action
  newBook(title, info, moreInfo) {
    let book = { "id": this._books.length + 1, "title": title, "info": info, "moreInfo": moreInfo }
    this.addBook(book);
  }

  @action
  addBook(book) {
    this._books.push(book);
  }

  //delete a book
  @action
  deleteBook(book_id) {
    this._books.splice(this._books.findIndex((book) => { return book.id === book_id }), 1)
  }

  //this is asynchronous
  fetchBooks = () => {
    fetch("http://localhost:7777/books")
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this.changeBooks(response);
        // this._books.replace(response);
        console.log("Got books from server");
      })
  }
}

//this shows how cool MobX is ;)
let store = new BookStore();

//global object in the browser, store has my books array
window.store = store;

export default store;