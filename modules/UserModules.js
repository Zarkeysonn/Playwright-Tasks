import { expect, request } from "@playwright/test";

class UserModules {
  async LoginUser({ unamepass, status = 200, statusCode = "Success" }) {
    let apiContext = await request.newContext();
    const loginResponse = await apiContext.post("/Account/v1/GenerateToken", {
      data: unamepass,
    });
    expect(loginResponse.status()).toEqual(status);
    return await loginResponse.json();
  }

  async getUserId({ username, password }) {
    let apiContext = await request.newContext();
    const loginRequest = await apiContext.post("/Account/v1/Login", {
      data: {
        userName: username,
        password: password,
      },
    });
    const body = await loginRequest.json();
    expect(await body.username).toEqual(username);
    expect(await body.password).toEqual(password);
    return body;
  }

  async authoriseUser({ user, status = 200 }) {
    let apiContext = await request.newContext();
    const authoriseUser = await apiContext.post("/Account/v1/Authorized", {
      data: user,
    });
    expect(authoriseUser.status()).toEqual(status);
    return;
  }

  // uraditi svugde sa 2 parama uname i pass kao poslati objekat
  async registerUser({ unamepass, status = 201 }) {
    let apiContext = await request.newContext();
    const registerResponse = await apiContext.post("/Account/v1/User", {
      data: unamepass,
    });
    const registerResponseBody = await registerResponse.json();
    expect(registerResponse.status()).toEqual(status);
    expect(registerResponseBody.username).not.toBe("");
    expect(registerResponseBody.userID).not.toBe("");
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
