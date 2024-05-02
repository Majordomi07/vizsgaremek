describe("calculateWageRanges", () => {
  it("A bérkategóriákat helyesen kell kiszámolnia", () => {
    cy.request("GET", "localhost:3000/advertisement/calculateWageRanges").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("ranges").that.is.an("array").not.empty;
    });
  });
});
