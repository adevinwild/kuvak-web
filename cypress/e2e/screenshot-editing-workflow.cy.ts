before('Clear downloads folder', () => {
  cy.exec('rm cypress/downloads/*', { log: true, failOnNonZeroExit: false })
})

describe('template spec', () => {
  it('allows a user to upload a picture, update screenshot options, and export', () => {
    cy.visit('http://localhost:5173/')

    // Step 1 : Upload a picture
    cy.get("input[type='file']").should('exist')
    cy.get("input[type='file']").selectFile(
      'cypress/images/workflow-image.png',
      {
        force: true,
      },
    )

    // Step 2 : Update screenshot options
    cy.get('#toolbar').should('exist')
    cy.get("[role='combobox']").should('exist')

    // THEME OPTIONS - TESTING
    cy.get("[role='combobox']").click()
    cy.get("[role='option']").eq(0).click()
    // Select another option from the dropdown
    cy.get("[role='combobox']").click()
    cy.get("[role='option']").eq(1).click()

    // SCALE OPTION - TESTING
    cy.get('#scale-option').should('exist')
    cy.get('#scale-option').find('small').should('exist')

    // Based on the image and the logic, the scale should default to x4, since it's small image
    cy.get('#scale-option').find('small').should('have.text', 'x4.0')

    cy.get('#scale-option').click()
    cy.get('#scale-option').type('{leftarrow}'.repeat(4))

    // Now the scale should be at x1.7 based on the input steps
    cy.get('#scale-option').find('small').should('have.text', 'x1.7')

    // PADDING OPTION - TESTING
    cy.get('#padding-option').should('exist')
    cy.get('#padding-option').find('small').should('exist')

    // Default to 8px
    cy.get('#padding-option').find('small').should('have.text', '8px')

    // Now the padding should be at 0px based on the mouse click
    cy.get('#padding-option').click('left')
    cy.get('#padding-option').find('small').should('have.text', '0px')

    // PADDING OPTION - TESTING
    cy.get('#roundness-option').should('exist')
    cy.get('#roundness-option').find('small').should('exist')

    // Default to 8px
    cy.get('#roundness-option').find('small').should('have.text', '8px')

    // Now the roundness should be at 100px (MAX ROUNDNESS) based on the mouse click
    cy.get('#roundness-option').click('right')
    cy.get('#roundness-option').find('small').should('have.text', '100px')

    // Step 3 : Export the image
    cy.get('#export-button').should('exist')
    cy.get('#export-button').click()

    // Step 4 : Verify that the loading overlay is shown
    cy.get('#loading-overlay').should('exist')
    cy.wait(500)
    // Step 5 : Verify that the success overlay is shown
    cy.get('#success-overlay').should('exist')

    // Step 6: Verify that we are on the `FileUpload` page
    cy.get("input[type='file']").should('exist')

    // Step 7: Verify that a file has been downloaded
    cy.task('hasDownloads').should('eq', true)
  })
})
