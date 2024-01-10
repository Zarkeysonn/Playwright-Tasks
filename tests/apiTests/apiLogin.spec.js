const { test, expect, request } = require("@playwright/test");
const { UserModules } = require("../../modules/UserModules");

import loginData from "../../fixtures/loginData.json";

let apiContext;
let userModules;
let usernamePass;
let response;

const loginPayLoad = {
  password: loginData.password,
  userName: loginData.username,
};

test.describe("Positive login api testing", () => {
  test.skip("Happy flow basic", async () => {
    apiContext = await request.newContext();
    const loginResponse = await apiContext.post("/Account/v1/Login", {
      data: loginPayLoad,
    });
    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.headers()["content-length"]).toContain("376");
    const loginResponseJson = await loginResponse.json();
    expect(loginResponseJson.username).toEqual(loginPayLoad.userName); //equal koristiti
  });

  test("Valid login scenario using utils file", async () => {
    const apiContext = await request.newContext();
    userModules = await new UserModules(apiContext);
    const usernamePass = await userModules.setUsernamePassword(
      "zarko1234",
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      statusCode: 200,
    });
  });
});

test.describe("Negative login api testing", () => {
  test.beforeEach("Before each for creating textContext", async () => {
    apiContext = await request.newContext();
    userModules = await new UserModules(apiContext);
  });

  test("Bad username random string: ", async () => {
    usernamePass = await userModules.setUsernamePassword(
      "dskjhsdfhjkdfhjkefrhjk",
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 200,
    });
  });

  test.only("Empty username", async () => {
    usernamePass = await userModules.setUsernamePassword(
      loginData.emptyString,
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 400,
    });
    expect(await response.message).toEqual(loginData.messageLogin);
  });

  test("Username array of strings", async () => {
    usernamePass = await userModules.setUsernamePassword(
      "['ff','sdf','fdfa']",
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 200,
    });
  });

  test("Username empty array", async () => {
    usernamePass = await userModules.setUsernamePassword(
      [],
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 400,
    });
  });

  test("Password empty", async () => {
    usernamePass = await userModules.setUsernamePassword(
      loginData.username,
      loginData.emptyString
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 400,
    });
  });

  test("Bad password", async () => {
    usernamePass = await userModules.setUsernamePassword(
      loginData.username,
      loginData.test
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 200,
    });
  });
});
