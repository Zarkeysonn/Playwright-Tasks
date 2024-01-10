import { expect } from "@playwright/test";
import loginData from "../fixtures/loginData.json";

class BookModules {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }
  async getBook() {
    const getAllBooks = await this.apiContext.get("/BookStore/v1/Books");
    const getAllBooksBody = await getAllBooks.json();
    const isbnArray = await getAllBooksBody.books.map((book) => book.isbn);
    const titleArray = await getAllBooksBody.books.map((book) => book.title);
    const bookIsbn = isbnArray[0];
    const title = titleArray[0];
    expect(title).toContain("Git");
    return bookIsbn;
  }

  async postBooksToUser({
    userId,
    bookIsbn,
    token,
    status = loginData.status201,
  }) {
    const postBookData = {
      userId: userId,
      collectionOfIsbns: [{ isbn: bookIsbn }],
    };

    const addBookToUser = await this.apiContext.post("/BookStore/v1/Books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: postBookData,
    });

    const statusCode = await addBookToUser.status();
    expect(statusCode).toEqual(status);
    return addBookToUser;
  }

  async deleteBooks({ userId, token, status = 204 }) {
    const deleteBooks = await this.apiContext.delete(
      `/BookStore/v1/Books?UserId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const deleteBooksStatus = await deleteBooks.status();
    expect(deleteBooksStatus).toEqual(status);
    return deleteBooks;
  }
}
module.exports = { BookModules };
