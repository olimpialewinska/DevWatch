import Home from ".";

describe("Home", () => {
  it("should render", () => {
    cy.mount(<Home />);
  });
});
