describe("Open posts", () => {
    it("Should open posts page", () => {
        cy.visit("http://localhost:8080/posts");
    });
    it("Should open a post", () => {
        cy.get('.col:first-child a.btn.btn-dark.btn-sm.read-more').click();
    })
});

describe("Check content", () => {
    it("Should contain a title", () => {
        cy.get(".content-box h1").its('length').should('be.gt', 0);
    });

    it("Should contain a subtitle", () => {
        cy.get(".content-box h4").its('length').should('be.gt', 0);
    });

    it("Should contain an author and date", () => {
        cy.get(".content-box h6").its('length').should('be.gt', 0);
    });

    it("Image should contain a working image", () => {
        cy.get(".content-box img").should('have.attr', 'src').then((src) => {
            cy.request(src).then((resp) => {
                expect(resp.status).to.eq(200);
            })
        });
    });

    it("Should contain content", () => {
        cy.get('#___scully-parsing-error___').should('not.exist');
    });

    it("Should contain tags", () => {
        cy.get(".tagbox").its('length').should('be.gt', 0);
    });
});
