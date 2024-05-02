describe("getApplicants", () => {
  it("A jelentkezők lekérdezésének működnie kell", () => {
    cy.request("GET", "localhost:3000/advertisement/getApplicants/1").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.lengthOf.at.least(1);
    });
  });
});
