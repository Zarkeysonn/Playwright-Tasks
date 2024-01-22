const { request } = require("@playwright/test");
import { test, expect } from "../../modules/base";
import loginData from "../../fixtures/loginData.json";

let apiContext;
let usernamePass;
let response;

const loginPayLoad = {
  password: loginData.password,
  userName: loginData.username,
};

test("Basic try", async ({ userModules }) => {
  const usernamePass = await userModules.setUsernamePassword(
    loginData.existing_user_Username,
    loginData.password
  );
  response = await userModules.LoginUser({
    unamepass: usernamePass,
    statusCode: 200,
  });
});

test.describe("Positive login api testing", () => {
  test.skip("Happy flow basic", async ({ wpage, userModules }) => {
    apiContext = await request.newContext();
    const loginResponse = await apiContext.post("/Account/v1/Login", {
      data: loginPayLoad,
    });
    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.headers()["content-length"]).toContain("376");
    const loginResponseJson = await loginResponse.json();
    expect(loginResponseJson.username).toEqual(loginPayLoad.userName); //equal koristiti
  });

  test("Valid login scenario using utils file", async ({ userModules }) => {
    const usernamePass = await userModules.setUsernamePassword(
      loginData.existing_user_Username,
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      statusCode: 200,
    });
  });
});

test.describe("Negative login api testing", () => {
  test("Bad username random string: ", async ({ userModules }) => {
    usernamePass = await userModules.setUsernamePassword(
      "dskjhsdfhjkdfhjkefrhjk",
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 200,
    });
  });

  test("Empty username", async ({ userModules }) => {
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

  test("Username array of strings", async ({ userModules }) => {
    usernamePass = await userModules.setUsernamePassword(
      "['ff','sdf','fdfa']",
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 200,
    });
  });

  test("Username empty array", async ({ userModules }) => {
    usernamePass = await userModules.setUsernamePassword(
      [],
      loginData.password
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 400,
    });
  });

  test("Password empty", async ({ userModules }) => {
    usernamePass = await userModules.setUsernamePassword(
      loginData.username,
      loginData.emptyString
    );
    response = await userModules.LoginUser({
      unamepass: usernamePass,
      status: 400,
    });
  });

  test("Bad password", async ({ userModules }) => {
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
