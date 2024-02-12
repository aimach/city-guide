describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await fetch("http://localhost:5000/api/cities", {
      method: "GET",
    });
    expect(response.status).toBe(200);
  });
});
