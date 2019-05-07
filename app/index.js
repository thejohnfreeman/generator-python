const fse = require('fs-extra')

const Generator = require('yeoman-generator')

const PYTHON3_VERSION_PATTERN = /^3\.([0-9]+)/

module.exports = class extends Generator {
  async initializing() {
    this.defaults = {
      project_name: this.determineAppname().replace(/[^a-zA-Z0-9_]/g, '-'),
      version: '0.1.0',
      author: this.user.git.name(),
      email: this.user.git.email(),
      username: await this.user.github.username(),
    }
  }

  async _getPythonMinorVersion() {
    let version
    try {
      version = await fse.readFile('.python-version')
    } catch (cause) {
      if (cause.code === 'ENOENT') {
        console.warn('You have not set a local Python version with pyenv.')
      }
      return 6
    }
    const match = PYTHON3_VERSION_PATTERN.exec(version)
    if (!match) {
      throw new Error(
        `The local python version is ${version}, but Poetry only supports Python 3.`,
      )
    }
    const minor = parseInt(match[1])
    return minor < 6 ? 6 : minor
  }

  async prompting() {
    // We would like to set all defaults in the constructor, but we cannot
    // call asynchronous functions there.
    const python_minor = await this._getPythonMinorVersion()
    this.defaults.python_minor = python_minor

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
        type: 'list',
        name: 'python_minor',
        message: 'The minimum supported version of Python:',
        choices: [
          { name: '3.6-dev', value: 6 },
          { name: '3.7-dev', value: 7 },
          { name: '3.8-dev', value: 8 },
        ],
        default: this.defaults.python_minor,
      },
    ])
  }

  async writing() {
    ;[
      'pyproject.toml',
      'README.rst',
      'LICENSE',
      'Makefile',
      '.travis.yml',
      'docs/conf.py',
      'docs/index.rst',
      '.readthedocs.yml',
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
      'docs/Makefile',
      'docs/make.bat',
      'docs/_static',
      'tests',
    ].forEach(path => {
      this.fs.copy(this.templatePath(path), this.destinationPath(path))
    })
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
