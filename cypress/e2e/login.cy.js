function createAccount(email) {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="nav-sign-in"]').click()
    cy.get('[data-test="register-link"]').click()
    cy.get('[data-test="first-name"]').type('Dragana')
    cy.get('[data-test="last-name"]').type('Vlajnic')
    cy.get('[data-test="dob"]').type('1991-12-31')
    cy.get('[data-test="address"]').type('Ulica 1/1')
    cy.get('[data-test="postcode"]').type('11000')
    cy.get('[data-test="city"]').type('Belgrade')
    cy.get('[data-test="state"]').type('Serbia')
    cy.get('[data-test="country"]').select("Serbia")
    cy.get('[data-test="phone"]').type('069999999')
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="password"]').type('password')
    cy.get('[data-test="register-submit"]').click()
}

it ('Login', function () {
    var email = `${Date.now()}@test.com`
    createAccount(email)
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="nav-sign-in"]').click()
    cy.url().should('eq', 'https://practicesoftwaretesting.com/#/auth/login')
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="password"]').type('password')
    cy.get('[data-test="login-submit"]').click()
    cy.url().should('eq', 'https://practicesoftwaretesting.com/#/account')
})

it ('Login wrong email format', function () {
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="nav-sign-in"]').click()
    cy.url().should('eq', 'https://practicesoftwaretesting.com/#/auth/login')
    cy.get('[data-test="email"]').type('aa.com')
    cy.get('[data-test="login-submit"]').click()
    cy.get('[data-test="email-error"]').should('be.visible')    
    cy.get('[data-test="email-error"]').contains('E-mail format is invalid')    
})


it ('Login short password', function () {
    var email = `${Date.now()}@test.com`
    createAccount(email)
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="nav-sign-in"]').click()
    cy.url().should('eq', 'https://practicesoftwaretesting.com/#/auth/login')
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="password"]').type('a')
    cy.get('[data-test="login-submit"]').click()
    cy.get('[data-test="password-error"]').should('be.visible')
    cy.get('[data-test="password-error"]').contains('Password length is invalid')
})

it ('Invalid mail', function () {
    var email = `${Date.now()}@test.com`
    createAccount(email)
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="nav-sign-in"]').click()
    cy.url().should('eq', 'https://practicesoftwaretesting.com/#/auth/login')
    cy.get('[data-test="email"]').type('b@b.com')
    cy.get('[data-test="password"]').type('password')
    cy.get('[data-test="login-submit"]').click()
    cy.get('[data-test="login-error"]').should('be.visible')
    cy.get('[data-test="login-error"]').contains('Invalid email or password')
})

it ('Invalid password', function () {
    var email = `${Date.now()}@test.com`
    createAccount(email)
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="nav-sign-in"]').click()
    cy.url().should('eq', 'https://practicesoftwaretesting.com/#/auth/login')
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="password"]').type('password2')
    cy.get('[data-test="login-submit"]').click()
    cy.get('[data-test="login-error"]').should('be.visible')
    cy.get('[data-test="login-error"]').contains('Invalid email or password')
})

it ('Too many unsuccessful attempts to login', function () {
    var email = `${Date.now()}@test.com`
    var wrongAttemptsAllowed = 3
    createAccount(email)

    for (var i = 0; i < wrongAttemptsAllowed; i++) {
        cy.visit('https://practicesoftwaretesting.com/#/')
        cy.get('[data-test="nav-sign-in"]').click()
        cy.url().should('eq', 'https://practicesoftwaretesting.com/#/auth/login')
        cy.get('[data-test="email"]').type(email)
        cy.get('[data-test="password"]').type('password2')
        cy.get('[data-test="login-submit"]').click()
    }
    cy.visit('https://practicesoftwaretesting.com/#/')
    cy.get('[data-test="nav-sign-in"]').click()
    cy.url().should('eq', 'https://practicesoftwaretesting.com/#/auth/login')
    cy.get('[data-test="email"]').type(email)
    cy.get('[data-test="password"]').type('password2')
    cy.get('[data-test="login-submit"]').click()
    cy.get('[data-test="login-error"]').should('be.visible')
    cy.get('[data-test="login-error"]').contains('Account locked, too many failed attempts. Please contact the administrator.')
})