const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
let { User } = require("../db/models");

describe("POST /api/users", () => {
  it("create a user", async () => {
    const count = User.count();
    const res = await request
      .post(`/api/users`)
      .send({
        first_name: "Dammy",
        last_name: "Sname",
        email: "dee_sname.com",
        password: "abc123",
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    const { first_name, last_name, email } = res.body.user;
    expect(first_name).toEqual("Dammy");
    expect(last_name).toEqual("Sname");
    expect(email).toEqual("dee_sname.com");

    expect(User.count).toEqual(count + 1);
  });
});
