import { Command, flags } from '@oclif/command'
import { existsSync, writeFileSync, mkdirSync } from 'fs'
import { prompt } from 'inquirer'
import { configPath, defaultPath, documentsPath } from '../constants'
import { validateGitHubToken } from 'validate-github-token'

export interface BragConfig {
  environment: string
  path: string
  token?: string
}

export default class Init extends Command {
  static description = 'Initialize your daily-brag settings'

  static examples = [`$ daily-brag init`]

  static flags = {
    help: flags.help({ char: 'h' })
  }

  private checkForConfigFile() {
    if (!existsSync(defaultPath)) {
      mkdirSync(documentsPath, { recursive: true })
      return false
    }

    return true
  }

  private async createConfigFile() {
    const responses = await prompt<BragConfig>([
      {
        name: 'environment',
        message: 'Where do you want to host your files?',
        type: 'list',
        choices: [
          { name: 'github' }
          /**
           * TODO: support local in the future
           */
          // , { name: 'locally' }
        ]
      },
      {
        name: 'path',
        message: `What's the repository URL?`,
        type: 'input',
        when: (answers) => answers.environment === 'github',
        validate: (answer: string) => {
          if (/https:\/\/github.com/i.test(answer)) {
            return true
          }
          return 'Invalid github URL'
        }
      },
      {
        name: 'path',
        message: 'In which folder do you want to create your documents?',
        type: 'input',
        validate: (answer: string) => {
          if (existsSync(answer)) {
            return true
          }
          return 'Folder does not exist'
        },
        when: (answers) => answers.environment === 'locally'
      },
      {
        name: 'token',
        message: `What's your github token?`,
        type: 'input',
        when: (answers) => answers.environment === 'github',
        validate: async (answer: string) => {
          const repo = 'repo'
          const { scopes } = await validateGitHubToken(answer, {
            scope: {
              included: [repo]
            }
          })

          if (scopes.includes(repo)) {
            return true
          }
          return `Invalid token, please create one: https://github.com/settings/tokens/new?scopes=${repo}`
        }
      }
    ])

    writeFileSync(configPath, JSON.stringify(responses, null, 2), 'utf-8')
  }

  async run() {
    this.parse(Init)

    const exists = this.checkForConfigFile()

    if (!exists) {
      await this.createConfigFile()
    }
  }
}
