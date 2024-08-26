const BASE_URL = "http://localhost:4000/";
const request = require("supertest");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvdWRhLm1hbGxlbTFAZ21haWwuY29tIiwicm9sZSI6Imd1ZXN0IiwiaWF0IjoxNzI0NTY0NzM2LCJleHAiOjE3MjQ1NzE5MzZ9.UyFzJm8jXjrI_BVO31j0j_s1d_iuiXI9HJG5qzeKzS4";
test("get Product by id success", async () => {
  const response = await request(BASE_URL)
    .get("api/v1/products/66c89d62c9500c2304bf55e2/")
    .set("Authorization", token);
  expect(response.status).toBe(200);
});

test("Wrong id product format", async () => {
  const wrongResponse = await request(BASE_URL)
    .get("api/v1/products/66c89d62c9500c2304bf55e2P/")
    .set("Authorization", token);
  expect(wrongResponse.status).toBe(400);
});
