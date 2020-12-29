import { Command, flags } from '@oclif/command'
import { Octokit } from '@octokit/core'
import { readdirSync, readFileSync, unlink } from 'fs'
import { prompt, registerPrompt } from 'inquirer'
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'
import { configPath, documentsPath } from '../constants'
import { BragConfig } from './init'

registerPrompt('file-tree-selection', inquirerFileTreeSelection)

export default class Upload extends Command {
  static description = 'Upload a daily-brag document'

  static examples: [`$ daily-brag upload`]

  static flags = {
    help: flags.help({ char: 'h' })
  }

  private async uploadFile(
    octokit: Octokit,
    path: string,
    owner: string,
    repo: string
  ) {
    const contentQuery = '/repos/{owner}/{repo}/contents/{path}'
    const content = readFileSync(path, {
      encoding: 'base64'
    })

    const filename = path.split('/').pop() ?? ''

    await octokit
      .request(`PUT ${contentQuery}/${filename}`, {
        owner,
        repo,
        path: filename.split('-')[0],
        message: `Uploading daily-brag of ${filename}`,
        content
      })
      .then(() => {
        unlink(path, console.error)
      })
      .catch(this.error)
  }

  async run() {
    this.parse(Upload)

    const files = readdirSync(documentsPath).filter(
      (file) => file !== '.DS_Store'
    )
    const numberOfFile = files.length

    let config: BragConfig | null = null

    if (!numberOfFile) {
      this.error(`There's nothing to upload, please create a document`)
    }

    try {
      config = JSON.parse(readFileSync(configPath, 'utf-8'))
    } catch (error) {
      this.error(
        `No configuration file found, please run the init command`,
        error
      )
    }

    const octokit = new Octokit({ auth: config?.token })
    const [, , , owner, repo] = config?.path.split('/') ?? []

    if (numberOfFile === 1) {
      const [file] = files

      await this.uploadFile(octokit, `${documentsPath}/${file}`, owner, repo)
    } else {
      const { file } = await prompt([
        {
          type: 'file-tree-selection',
          name: 'file',
          root: documentsPath,
          hideRoot: true,
          onlyShowValid: true,
          validate: (file) => {
            if (file.endsWith('.md')) {
              return true
            }
            return false
          }
        }
      ])

      await this.uploadFile(octokit, file, owner, repo)
    }
  }
}
