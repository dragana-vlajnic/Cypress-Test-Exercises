it ('Search for hammers', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="search-query"]').type('hammer')
    cy.get('[data-test="search-submit"]').click()
    cy.wait(5000)
    cy.get('h3').contains('Searched for: hammer')
    cy.get('.col-md-9 > div:nth-child(2)').should('exist').as('targetElement');
    cy.get('@targetElement').children().should('exist');
    var count = 0;

    cy.get('.col-md-9 > div:nth-child(2)').children().should('have.length', 7)
    .each(($item) => {
        cy.wrap($item).contains("hammer", {matchCase: false});
       })
   .then(($items) => {
    const numberOfItems = $items.length
    cy.log('Number of items found is ' + numberOfItems)
    cy.wrap(numberOfItems).should('eq', 7)
    
   });
})

it ('Search for screwdriver', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="search-query"]').type('screwdriver')
    cy.get('[data-test="search-submit"]').click()
    cy.wait(5000)
    cy.get('h3').contains('Searched for: screwdriver')
    cy.get('.col-md-9 > div:nth-child(2)').should('exist').as('targetElement');
    cy.get('@targetElement').children().should('exist');
    var count = 0;

    cy.get('.col-md-9 > div:nth-child(2)').children().should('have.length', 2)
    .each(($item) => {
        cy.wrap($item).contains("screwdriver", {matchCase: false});
    })
   .then(($items) => {
    const numberOfItems = $items.length
    cy.log('Number of items found is ' + numberOfItems)
    cy.wrap(numberOfItems).should('eq', 2)
   });
})

it ('Search for Hammers and screwdrivers by checking category', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get(':nth-child(13) > ul > :nth-child(1) > label').click()
    cy.get(':nth-child(4) > label').click()
    cy.wait(5000)
    cy.get('.col-md-9 > div:nth-child(1)').should('exist').as('targetElement');
    cy.get('@targetElement').children().should('exist');
    var count = 0;

    cy.get('.col-md-9 > div:nth-child(1)').children().should('have.length', 9)
    .each(($item) => {
        cy.wrap($item).contains(/hammer|screwdriver/i, {matchCase: false});
    })
   .then(($items) => {
    const numberOfItems = $items.length
    cy.log('Number of items found is ' + numberOfItems)
    cy.wrap(numberOfItems).should('eq', 9)
   });
})

it ('Search for Hammers and screwdrivers and drills by checking category', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get(':nth-child(13) > ul > :nth-child(1) > label').click()
    cy.get(':nth-child(4) > label').click()
    cy.get(':nth-child(6) > label').click()
    cy.wait(5000)
    cy.get('.col-md-9 > div:nth-child(1)').should('exist').as('targetElement');
    cy.get('@targetElement').children().should('exist');
    var count = 0;
    cy.get('.pagination').children().should('have.length', 4)

    cy.get('.col-md-9 > div:nth-child(1)').children().should('have.length', 9)
    .each(($item) => {
        cy.wrap($item).contains(/hammer|screwdriver|drill/i, {matchCase: false});
    })
   .then(($items) => {
    const numberOfItems = $items.length
    cy.log('Number of items found is ' + numberOfItems)
    cy.wrap(numberOfItems).should('eq', 9)
   });

   cy.get(':nth-child(3) > .page-link').click()
   cy.wait(5000)


   cy.get('.col-md-9 > div:nth-child(1)').should('exist').as('targetElement');
   cy.get('@targetElement').children().should('exist');
   var count = 0;
   cy.get('.pagination').children().should('have.length', 4)

   cy.get('.col-md-9 > div:nth-child(1)').children().should('have.length', 2)
   .each(($item) => {
       cy.wrap($item).contains(/hammer|screwdriver|drill/i, {matchCase: false});
   })
  .then(($items) => {
   const numberOfItems = $items.length
   cy.log('Number of items found is ' + numberOfItems)
   cy.wrap(numberOfItems).should('eq', 2)
  });
})


it ('Search for hammers and than filter to only shows screwdrivers', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="search-query"]').type('hammer')
    cy.get('[data-test="search-submit"]').click()
    cy.get(':nth-child(4) > label').click()
    cy.get('h3').contains("Searched for: hammer")
    cy.get('[data-test="no-results"]').should('be.visible')
})

it ('Filter by Brand 1', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get(':nth-child(18) > label').click()
    cy.wait(5000)
    cy.get('.pagination').children().should('have.length', 5)

})

