const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
let { sequelize, User } = require("../../db/models");

afterAll(() => sequelize.close());

describe("POST /api/users", () => {
  it("create a user", async () => {
    const count = await User.count();
    const res = await request
      .post(`/api/users`)
      .send({
        first_name: "Dammy",
        last_name: "Sname",
        email: "dee_sname.com",
        password: "abc123",
        phone_number: "2390876789",
        address: "Benda str 21B Berlin Germany",
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    const {
      first_name,
      last_name,
      email,
      phone_number,
      address,
    } = res.body.user;
    expect(first_name).toEqual("Dammy");
    expect(last_name).toEqual("Sname");
    expect(email).toEqual("dee_sname.com");
    expect(phone_number).toEqual("2390876789");
    expect(address).toEqual("Benda str 21B Berlin Germany");
    expect(await User.count()).toEqual(count + 1);
  });
});
