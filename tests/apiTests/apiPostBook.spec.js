import { test, expect } from "../../modules/base";
import loginData from "../../fixtures/loginData.json";

let usernamePass;
let userId;
let token;
let authorizeUser;
let postBook;
let bookIsbn;

test.describe("Happy flow of adding books to user", async () => {
  userId = loginData.userId;
  test.beforeEach(async ({ userModules }) => {
    usernamePass = await userModules.setUsernamePassword(
      loginData.existing_user_Username,
      loginData.password
    );
    const loginUser = await userModules.LoginUser({ unamepass: usernamePass });
    token = await loginUser.token;
  });

  test("Happy flow!", async ({ userModules, bookModules }) => {
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

  test.afterEach("After each happy flow", async ({ bookModules }) => {
    await bookModules.deleteBooks({
      userId: userId,
      token: token,
      status: 204,
    });
  });
});
