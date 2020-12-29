import { homedir } from 'os'
import { join } from 'path'

export const defaultPath = join(homedir(), '.daily-brag')
export const configPath = join(defaultPath, 'config')
export const templatePath = join(__dirname, 'template', 'brag.template.md')
export const documentsPath = join(defaultPath, 'temp')
