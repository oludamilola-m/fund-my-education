const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
var { sequelize, Funding, Donation } = require("../../db/models");

beforeAll(async (done) => {
  await Donation.destroy({ where: {}, truncate: { cascade: true } });
  await Funding.destroy({ where: {}, truncate: { cascade: true } });
  done();
});

afterAll(() => sequelize.close());

describe("GET /api/fundings", () => {
  it("returns all fundings", async () => {
    await Funding.create({
      title: "Sequi saepe placeat occaecati occaecati",
      description:
        "Doloremque voluptatibus cum et ad repellat rerum corporis. Sed aut quia libero sed doloribus esse fuga quia quas. Adipisci quam asperiores. Sint dolore id maxime dolor quia omnis. Magni expedita non molestias suscipit.",
      image_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg",
      total_amount: 1319,
      donated_amount: 0,
      approved_at: new Date(),
      progress: 0,
    });
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
    await Funding.destroy({ where: {}, truncate: { cascade: true } });
    const res = await request.get("/api/fundings");
    expect(res.body.fundings.length).toEqual(0);
  });
});

describe("GET /api/fundings/:id", () => {
  it("gets a Funding", async () => {
    const funding = await Funding.create({
      title: "Sequi saepe placeat occaecati occaecati",
      description:
        "Doloremque voluptatibus cum et ad repellat rerum corporis. Sed aut quia libero sed doloribus esse fuga quia quas. Adipisci quam asperiores. Sint dolore id maxime dolor quia omnis. Magni expedita non molestias suscipit.",
      image_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisslowik/128.jpg",
      total_amount: 1319,
      donated_amount: 0,
      progress: 0,
    });

    const res = await request.get(`/api/fundings/${funding.id}`);

    expect(res.statusCode).toEqual(200);
    const {
      id,
      title,
      description,
      image_url,
      total_amount,
      donated_amount,
      progress,
    } = res.body.funding;
    // expect(title).toEqual(funding.title);
    // expect(description).toEqual(funding.description);
    // expect(image_url).toEqual(funding.image_url);
    // expect(total_amount).toEqual(funding.total_amount);
    // expect(donated_amount).toEqual(funding.donated_amount);
    // expect(progress).toEqual(funding.progress);
    const attributesObject = {
      id,
      title,
      description,
      image_url,
      total_amount,
      donated_amount,
      progress,
    };

    const expectedAttributesObject = {
      id: funding.id,
      title: funding.title,
      description: funding.description,
      image_url: funding.image_url,
      total_amount: funding.total_amount,
      donated_amount: funding.donated_amount,
      progress: funding.progress,
    };
    expect(attributesObject).toEqual(expectedAttributesObject);
  });

  test("when funding is not found", async () => {
    const res = await request.get(`/api/fundings/999`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Funding not found");
  });
});
