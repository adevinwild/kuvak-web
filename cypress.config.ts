import { defineConfig } from 'cypress'
import fs from 'fs'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // implement node event listeners here
      on('task', {
        hasDownloads() {
          const hasDownloadsFolder = fs.existsSync('cypress/downloads')
          const hasFilesInside = fs.readdirSync('cypress/downloads').length > 0

          return hasDownloadsFolder && hasFilesInside
        },
      })
    },
  },
})
