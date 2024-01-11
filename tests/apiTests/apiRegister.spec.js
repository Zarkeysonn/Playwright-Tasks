import { test, expect } from "../../modules/base";

import loginData from "../../fixtures/loginData.json";

let usernamePass;
let deleteUser;
let token;
let userModules;

const registerPayLoad = {
  password: loginData.password,
  userName: "testic1234",
};

test.describe("Happy flow", async () => {
  test("New register user", async ({ userModules }) => {
    await userModules.registerUser({
      unamepass: registerPayLoad,
    });
    usernamePass = await userModules.setUsernamePassword(
      "testic1234",
      "ZarkeysonxD1!"
    );
    const loginResponse = await userModules.LoginUser({
      unamepass: usernamePass,
    });
    token = await loginResponse.token;
    const loginRequestUserId = await userModules.getUserId(registerPayLoad);
    await userModules.authoriseUser({ user: usernamePass });
    deleteUser = await userModules.deleteUser({
      usr: loginRequestUserId.userId,
      token: token,
      statusCode: 204,
    });
  });
});

test.describe("Bad flow", async () => {
  test("UserName field os empty", async ({ userModules }) => {
    const usernamePassword = await userModules.setUsernamePassword(
      loginData.emptyString,
      loginData.password
    );
    const registerUser = await userModules.registerUser({
      usernamePassword,
      status: 400,
    });
    expect(registerUser.code).toBe("1200");
  });

  test.skip("Username is array of random string", async () => {
    const randomAraay = ["aa", "asda", "dsff"];
    const usernamePassword = await userModules.setUsernamePassword(
      randomAraay,
      loginData.password
    );
    const registerUser = await userModules.registerUser({
      unamepass: usernamePassword,
      status: 406,
    });
    expect(registerUser.code).toBe("1200");
  });

  test("Username is emptry string of spaces", async ({ userModules }) => {
    const usernamePassword = await userModules.setUsernamePassword(
      "          ",
      loginData.password
    );
    const registerUser = await userModules.registerUser({
      unamepass: usernamePassword,
      status: 406,
    });
    expect(registerUser.code).toBe("1204");
  });

  test("Username only numbers", async ({ userModules }) => {
    const usernamePassword = await userModules.setUsernamePassword(
      12345678,
      loginData.password
    );
    const registerUser = await userModules.registerUser({
      unamepass: usernamePassword,
      status: 406,
    });
    expect(registerUser.code).toBe("1204");
  });

  test("Username boolean", async ({ userModules }) => {
    const usernamePassword = await userModules.setUsernamePassword(
      true,
      loginData.password
    );
    const registerUser = await userModules.registerUser({
      unamepass: usernamePassword,
      status: 406,
    });
    expect(registerUser.code).toBe("1204");
  });

  test("Password doesn't meet requirements", async ({ userModules }) => {
    const usernamePassword = await userModules.setUsernamePassword(
      loginData.newUsername,
      loginData.test
    );
    const registerUser = await userModules.registerUser({
      unamepass: usernamePassword,
      status: 400,
    });
    expect(registerUser.code).toBe("1300");
  });

  test("Password lenght is less than 8", async ({ userModules }) => {
    const usernamePassword = await userModules.setUsernamePassword(
      loginData.newUsername,
      loginData.invalidPasswordLength
    );
    const registerUser = await userModules.registerUser({
      unamepass: usernamePassword,
      status: 400,
    });
    expect(registerUser.code).toBe("1300");
  });

  test.skip("Password with only numbers", async ({ userModules }) => {
    const usernamePassword = await userModules.setUsernamePassword(
      loginData.newUsername,
      12345678
    );
    const registerUser = await userModules.registerUser({
      unamepass: usernamePassword,
      status: 406,
    });
    expect(registerUser.code).toBe("1300");
  });
});
