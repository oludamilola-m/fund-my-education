const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
var { sequelize, Funding } = require("../db/models");

let funding;
beforeEach(async (done) => {
  funding = await Funding.create({
    title: "Sequi saepe placeat occaecati occaecati",
    description:
      "Doloremque voluptatibus cum et ad repellat rerum corporis. Sed aut quia libero sed doloribus esse fuga quia quas. Adipisci quam asperiores. Sint dolore id maxime dolor quia omnis. Magni expedita non molestias suscipit.",
    image_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg",
    total_amount: 1319,
    donated_amount: 0,
    progress: 0,
  });
  done();
});

afterEach(async (done) => {
  await funding.destroy();
  done();
});

afterAll(() => sequelize.close());

describe("GET /api/fundings", () => {
  it("returns all fundings", async () => {
    const res = await request.get("/api/fundings");
    const response = res.body.fundings[0];

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("fundings");
    expect(res.body.fundings.length).toEqual(1);

    expect(response.title).toEqual("Sequi saepe placeat occaecati occaecati"); //toEqual
    expect(response.description).toEqual(
      "Doloremque voluptatibus cum et ad repellat rerum corporis. Sed aut quia libero sed doloribus esse fuga quia quas. Adipisci quam asperiores. Sint dolore id maxime dolor quia omnis. Magni expedita non molestias suscipit."
    );
    expect(response.image_url).toEqual(
      "https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg"
    );
    expect(response.total_amount).toEqual(1319);
    expect(response.donated_amount).toEqual(0);
    expect(response.progress).toEqual(0);
  });

  test("when no fundings", async () => {
    await funding.destroy();
    const res = await request.get("/api/fundings");
    expect(res.body.fundings.length).toEqual(0);
  });
});
