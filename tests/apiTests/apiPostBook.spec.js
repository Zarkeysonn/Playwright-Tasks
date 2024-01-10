const { test, request, expect } = require("@playwright/test");
const { UserModules } = require("../../modules/UserModules");
const { BookModules } = require("../../modules/BookModules");
import loginData from "../../fixtures/loginData.json";

let apiContext;
let usernamePass;
let userId;
let token;
let authorizeUser;
let postBook;
let bookIsbn;
let deleteBook;
let userModules;
let bookModules;

test.describe("Happy flow of adding books to user", async () => {
  userId = loginData.userId;
  test.beforeEach(async () => {
    apiContext = await request.newContext();
    userModules = await new UserModules(apiContext);
    bookModules = await new BookModules(apiContext);
    usernamePass = await userModules.setUsernamePassword(
      loginData.existing_user_Username,
      loginData.password
    );
    const loginUser = await userModules.LoginUser({ unamepass: usernamePass });
    token = await loginUser.token;
  });

  test("Happy flow!", async () => {
    authorizeUser = await userModules.authoriseUser({ user: usernamePass });
    bookIsbn = await bookModules.getBook();
    postBook = await bookModules.postBooksToUser({
      userId: userId,
      bookIsbn: bookIsbn,
      token: token,
      status: loginData.status201,
    });
    expect(postBook.status()).toEqual(201);
  });

  test.afterEach("After each happy flow", async () => {
    deleteBook = await bookModules.deleteBooks({
      userId: userId,
      token: token,
      status: 204,
    });
  });
});
