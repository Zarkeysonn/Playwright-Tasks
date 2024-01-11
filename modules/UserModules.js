import { expect, request } from "@playwright/test";

class UserModules {
  async LoginUser({ unamepass, status = 200, statusCode = "Success" }) {
    let apiContext = await request.newContext();
    const loginResponse1 = await apiContext.post("/Account/v1/GenerateToken", {
      data: unamepass,
    });
    const responseBody1 = await loginResponse1.json();
    const status1 = await loginResponse1.status();
    expect(status1).toEqual(status); // status od apia
    return responseBody1;
  }

  async authoriseUser(user) {
    let apiContext = await request.newContext();
    const authoriseUser = await apiContext.post("/Account/v1/Authorized", {
      data: user,
    });
    return authoriseUser;
  }

  async getUserId(userNamePassword) {
    let apiContext = await request.newContext();
    const loginRequest = await apiContext.post("/Account/v1/Login", {
      data: userNamePassword,
    });
    const body = await loginRequest.json();
    return body;
  }

  async authoriseUser({ user, status = 200 }) {
    let apiContext = await request.newContext();
    const authoriseUser = await apiContext.post("/Account/v1/Authorized", {
      data: user,
    });
    expect(authoriseUser.status()).toEqual(status);
    return authoriseUser;
  }

  async registerUser({ unamepass, status = 201 }) {
    let apiContext = await request.newContext();
    const registerResponse = await apiContext.post("/Account/v1/User", {
      data: unamepass,
    });
    const registerResponseBody = await registerResponse.json();
    expect(registerResponse.status()).toEqual(status);
    return registerResponseBody;
  }

  async deleteUser({ usr, token, statusCode = 204 }) {
    let apiContext = await request.newContext();
    const deleteUser = await apiContext.delete(`/Account/v1/User/${usr}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(deleteUser.status()).toEqual(statusCode);
    return deleteUser;
  }

  async setUsernamePassword(username, password) {
    this.username = username;
    this.password = password;
    return { userName: username, password: password };
  }
}
module.exports = { UserModules };
