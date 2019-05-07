const fs = require('fs')

const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async initializing() {
    this.defaults = {
      project_name: this.determineAppname().replace(/[^a-zA-Z0-9_]/g, '-'),
      version: '0.1.0',
      author: this.user.git.name(),
      email: this.user.git.email(),
      username: await this.user.github.username(),
      python: '3.6.8',
    }
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'project_name',
        message: 'The project name:',
        default: this.defaults.project_name,
      },
      {
        type: 'input',
        name: 'package_name',
        message: answers => `The package (or module) name:`,
        default: answers => answers.project_name.replace(/[^a-zA-Z0-9_]/g, '_'),
      },
      {
        type: 'input',
        name: 'version',
        message: 'The initial version:',
        default: this.defaults.version,
        hidden: true,
      },
      {
        type: 'input',
        name: 'author',
        message: 'The author name:',
        default: this.defaults.author,
      },
      {
        type: 'input',
        name: 'email',
        message: 'The author email:',
        default: this.defaults.email,
      },
      {
        type: 'input',
        name: 'username',
        message: 'The owner username:',
        default: this.defaults.username,
      },
      {
        type: 'input',
        name: 'repository',
        message: 'The repository URL:',
        default: answers =>
          `https://github.com/${answers.username}/${answers.project_name}/`,
      },
      {
        type: 'input',
        name: 'python',
        message: 'The minimum supported version of Python:',
        default: this.defaults.python,
      },
    ])
  }

  async writing() {
    ;[
      'pyproject.toml',
      'README.rst',
      'LICENSE',
      'Makefile',
      'docs/conf.py',
      'docs/index.rst',
    ].forEach(path => {
      this.fs.copyTpl(
        this.templatePath(path),
        this.destinationPath(path),
        this.answers,
      )
    })
    ;[
      '.gitignore',
      '.pylintrc',
      '.travis.yml',
      'docs/Makefile',
      'docs/make.bat',
      'docs/_static',
    ].forEach(path => {
      this.fs.copy(this.templatePath(path), this.destinationPath(path))
    })
    try {
      await fs.promises.mkdir(this.destinationPath('tests'))
    } catch (cause) {
      // Ignore if the directory already exists.
      if (cause.code !== 'EEXIST') {
        throw cause
      }
    }
  }

  _spawn(...args) {
    const child = this.spawnCommand(...args)
    return new Promise((resolve, reject) => {
      child.on('exit', (code, signal) => {
        if (code === 0) {
          resolve()
        } else {
          reject({ code, signal })
        }
      })
      child.on('error', reject)
    })
  }

  async install() {
    try {
      await this._spawn('pyenv', ['local', this.answers.python])
      await this._spawn('poetry', [
        'add',
        '--dev',
        'mypy',
        'pydocstyle',
        'pylint',
        'pytest',
        'pytest-cov',
        'sphinx=^1.8',
        'sphinx-autobuild',
        'sphinx_rtd_theme',
        'toml',
        'yapf',
      ])
    } catch (cause) {
      this.log(cause)
    }
  }
}
