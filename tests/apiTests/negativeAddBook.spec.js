const { request } = require("@playwright/test");
import { test } from "../../modules/base";

import loginData from "../../fixtures/loginData.json";

let usernamePass;
let token;
let bookIsbn;

let loginUser;

test.describe("Bad flow of adding books to user", async ({
  userModules,
  bookModules,
}) => {
  test.beforeEach(async () => {
    usernamePass = await userModules.setUsernamePassword(
      loginData.existing_user_Username,
      loginData.password
    );
    loginUser = await userModules.LoginUser({ unamepass: usernamePass });
    token = await loginUser.token;
    authorizeUser = await userModules.authoriseUser({
      user: usernamePass,
    });
    bookIsbn = await bookModules.getBook();
  });
  test("User Id is empty string", async ({ bookModules }) => {
    await bookModules.postBoodksToUser({
      userId: "",
      bookIsbn: bookIsbn,
      token: token,
      status: 401,
    });
  });
  test("User Id is empty array", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: [],
      bookIsbn: bookIsbn,
      token: token,
      status: loginData.status401,
    });
  });

  test.skip("User Id is true", async () => {
    authorizeUser = await userModules.authoriseUser({ user: usernamePass });
    bookIsbn = await bookModules.getBook();
    postBook = await bookModules.postBooksToUser({
      userId: true,
      bookIsbn: bookIsbn,
      token: token,
      status: loginData.status401,
    });
  });

  // kada pokrenem i ova dva sa boolean vrednostima pokarabusi se
  test.skip("User Id is false", async () => {
    authorizeUser = await userModules.authoriseUser(usernamePass);
    bookIsbn = await bookModules.getBook();
    postBook = await bookModules.postBooksToUser({
      userId: false,
      bookIsbn: bookIsbn,
      token: token,
      status: loginData.status401,
    });
  });

  test("User Id is random string", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: "somerandomstring",
      bookIsbn: bookIsbn,
      token: token,
      status: loginData.status401,
    });
  });

  test("User Id is random number", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: 128921893289,
      bookIsbn: bookIsbn,
      token: token,
      status: loginData.status401,
    });
  });

  test("User Id sent in array", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: [loginData.userId],
      bookIsbn: bookIsbn,
      token: token,
      status: 401,
    });
  });

  test("Book Isbn empty string", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: "",
      token: token,
      status: 401,
    });
  });

  test("Book Isbn array of numbers", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: [12, 2, 4, 34, 43, 2],
      token: token,
      status: 400,
    });
  });

  test("Book Isbn array of strings", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: ["dsf", "dsds", "sdds", "dsdsa"],
      token: token,
      status: loginData.status401,
    });
  });

  test("Book Isbn empty array", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: [],
      token: token,
      status: loginData.status401,
    });
  });

  test("Token is random string", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: bookIsbn,
      token: "thisisrandomstring",
      status: loginData.status401,
    });
  });

  test("Token is empty string", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: bookIsbn,
      token: "",
      status: loginData.status401,
    });
  });

  test("Token is array of numbers", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: bookIsbn,
      token: [1, 2, 3, 4, 5, 52, 23],
      status: loginData.status401,
    });
  });

  test("Token is random numbers", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: bookIsbn,
      token: 3248932482349,
      status: loginData.status401,
    });
  });

  test("Token is empty array", async ({ bookModules }) => {
    await bookModules.postBooksToUser({
      userId: loginData.userId,
      bookIsbn: bookIsbn,
      token: [],
      status: loginData.status401,
    });
  });
});
