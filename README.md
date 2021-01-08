# daily-brag

A simple reminder to document your daily accomplishments

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/daily-brag.svg)](https://npmjs.org/package/daily-brag)
[![Downloads/week](https://img.shields.io/npm/dw/daily-brag.svg)](https://npmjs.org/package/daily-brag)
[![License](https://img.shields.io/npm/l/daily-brag.svg)](https://github.com/git@github.com:c4tastic/daily-brag.git/blob/master/package.json)
![lint](https://github.com/c4tastic/daily-brag/workflows/lint/badge.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g daily-brag
$ daily-brag COMMAND
running command...
$ daily-brag (-v|--version|version)
daily-brag/0.0.1 darwin-x64 node-v14.1.0
$ daily-brag --help [COMMAND]
USAGE
  $ daily-brag COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`daily-brag autocomplete [SHELL]`](#daily-brag-autocomplete-shell)
- [`daily-brag help [COMMAND]`](#daily-brag-help-command)
- [`daily-brag init`](#daily-brag-init)
- [`daily-brag new`](#daily-brag-new)
- [`daily-brag upload`](#daily-brag-upload)

## `daily-brag autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ daily-brag autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ daily-brag autocomplete
  $ daily-brag autocomplete bash
  $ daily-brag autocomplete zsh
  $ daily-brag autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `daily-brag help [COMMAND]`

display help for daily-brag

```
USAGE
  $ daily-brag help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `daily-brag init`

Initialize your daily-brag settings

```
USAGE
  $ daily-brag init

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ daily-brag init
```

_See code: [src/commands/init.ts](https://github.com/c4tastic/daily-brag/blob/v0.0.1/src/commands/init.ts)_

## `daily-brag new`

Create a daily-brag document

```
USAGE
  $ daily-brag new

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ daily-brag new
```

_See code: [src/commands/new.ts](https://github.com/c4tastic/daily-brag/blob/v0.0.1/src/commands/new.ts)_

## `daily-brag upload`

Upload a daily-brag document

```
USAGE
  $ daily-brag upload

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/upload.ts](https://github.com/c4tastic/daily-brag/blob/v0.0.1/src/commands/upload.ts)_

<!-- commandsstop -->
