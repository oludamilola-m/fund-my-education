const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
var { sequelize, Funding, Donation } = require("../db/models");

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

describe("POST /api/fundings/:fundingId/donations", () => {
  it("create a donation", async () => {
    const previousDonationsCount = await Donation.count();
    const res = await request
      .post(`/api/fundings/${funding.id}/donations`)
      .send({
        donor_first_name: "john",
        donor_last_name: "doe",
        donor_phone_number: "4711345978",
        amount: 20,
        donor_email: "johndoe@gmail.com",
        payment_reference: "dfghjhgvbnmk",
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toEqual(201);
    expect(await Donation.count()).toEqual(previousDonationsCount + 1);
  });
});
