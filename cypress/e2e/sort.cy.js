
it ('Sort hammer by price from highest to lowest ', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get(':nth-child(13) > ul > :nth-child(1) > label').click()
    cy.get('[data-test="sort"]').select(3)
    cy.get('[data-test="sorting_completed"]').should('exist').as('targetElement');
    cy.get('@targetElement').children().then(($products) => {
    const prices = [];

      $products.each((index, element) => {
        const price = parseFloat(Cypress.$(element).find('[data-test="product-price"]').text().trim().replace('$', ''));
        prices.push(price);
      });

      // Check if the prices are sorted
      cy.wrap(prices).then((prices) => {
        var temp = prices[0]
        var isSorted = true;
        for (var i = 1; i < prices.length; i++) {
            if (prices[i] <= temp) {
                temp=prices[i];
            }
            else {
                isSorted = false;
            }
        }
        cy.wrap(isSorted).should('eq', true)
        })
      })
});

it ('Sort hammer by price from lowest to highest ', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get(':nth-child(13) > ul > :nth-child(1) > label').click()
    cy.get('[data-test="sort"]').select(4)
    cy.get('[data-test="sorting_completed"]').should('exist').as('targetElement');
    cy.get('@targetElement').children().then(($products) => {
    const prices = [];

      $products.each((index, element) => {
        const price = parseFloat(Cypress.$(element).find('[data-test="product-price"]').text().trim().replace('$', ''));
        prices.push(price);
      });

      // Check if the prices are sorted
      cy.wrap(prices).then((prices) => {
        var temp = prices[0]
        var isSorted = true;
        for (var i=1; i < prices.length; i++) {
            if (prices[i] >= temp) {
                temp=prices[i];
            }
            else {
                isSorted = false;
            }
        }
        cy.wrap(isSorted).should('eq', true)
        })
      })
});