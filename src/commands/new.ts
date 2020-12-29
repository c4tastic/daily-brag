import { Command, flags } from '@oclif/command'
import { readFileSync, writeFileSync } from 'fs'
import { configPath, documentsPath, templatePath } from '../constants'
import osLocale from 'os-locale'
import { render } from 'mustache'
import { BragConfig } from './init'
import { Octokit } from '@octokit/core'
import { exec } from 'child_process'

interface BragDocument {
  date: string
}

export default class New extends Command {
  static description = 'Create a daily-brag document'

  static examples = [`$ daily-brag new`]

  static flags = {
    help: flags.help({ char: 'h' })
  }

  private async checkIfYearFolderExists(
    octokit: Octokit,
    path: string,
    owner: string,
    repo: string
  ) {
    const contentQuery = '/repos/{owner}/{repo}/contents/{path}'

    return octokit
      .request(`GET ${contentQuery}`, {
        owner,
        repo,
        path
      })
      .catch(async (error) => {
        // folder doesn't exist
        if (error.status === 404) {
          await octokit.request(`PUT ${contentQuery}/.keep`, {
            owner,
            repo,
            path,
            message: `creating folder ${path}`,
            content: Buffer.from('.keep').toString('base64')
          })
        } else {
          this.error(error)
        }
      })
  }

  async run() {
    this.parse(New)

    let config: BragConfig | null = null

    try {
      config = JSON.parse(readFileSync(configPath, 'utf-8'))
    } catch (error) {
      this.error(
        `No configuration file found, please run the init command`,
        error
      )
    }

    const template = readFileSync(templatePath, 'utf-8')
    const dateFormat = new Intl.DateTimeFormat(await osLocale())
    const date = new Date()
    const formatedDate = dateFormat.format(date)
    const data: BragDocument = {
      date: formatedDate
    }
    const editor = process.env.EDITOR ?? process.env.VISUAL ?? 'code'
    const result = render(template, data)

    if (config?.environment === 'github') {
      // check if folder exists in github
      const octokit = new Octokit({ auth: config?.token })

      const [, , , owner, repo] = config?.path.split('/')
      const path = date.getFullYear().toString()

      await this.checkIfYearFolderExists(octokit, path, owner, repo)
    } else {
      // locally
    }

    const bragFileName = `${documentsPath}/${formatedDate}-daily-brag.md`

    writeFileSync(bragFileName, result, 'utf-8')

    exec(`${editor} ${bragFileName}`)
  }
}
