import { expect, request } from "@playwright/test";
import loginData from "../fixtures/loginData.json";

class BookModules {
  async getBook({ numOfBook = 0 }) {
    const apiContext = await request.newContext();
    const getAllBooks = await apiContext.get("/BookStore/v1/Books");
    const getAllBooksBody = await getAllBooks.json();
    const bookBody = getAllBooksBody.books[numOfBook];
    const isbnArray = await getAllBooksBody.books.map((book) => book.isbn);
    const titleArray = await getAllBooksBody.books.map((book) => book.title);
    const bookIsbn = isbnArray[numOfBook];
    const title = titleArray[numOfBook];
    expect(await titleArray).toContain(await title);
    expect(bookBody.title).toEqual(title);
    return bookIsbn;
  }

  async postBooksToUser({
    userId,
    bookIsbn,
    token,
    status = loginData.status201,
  }) {
    const apiContext = await request.newContext();
    const addBookToUser = await apiContext.post("/BookStore/v1/Books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: userId,
        collectionOfIsbns: [{ isbn: bookIsbn }],
      },
    });

    const statusCode = await addBookToUser.status();
    await expect(await statusCode).toEqual(await status);
    return addBookToUser;
  }

  async deleteBooks({ userId, token, status = 204 }) {
    const apiContext = await request.newContext();
    const deleteBooks = await apiContext.delete(
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
