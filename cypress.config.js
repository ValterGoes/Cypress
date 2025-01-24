const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  // foi setado width e height para o correto funcionamento do click
  viewportWidth: 1440,
  viewportHeight: 920,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }, 
    chromeWebSecurity: false
  },
});
