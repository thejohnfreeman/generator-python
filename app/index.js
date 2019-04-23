const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async initializing() {
    this.defaults = {
      name: this.determineAppname().replace(/[^a-zA-Z0-9_]/, '_'),
      author: this.user.git.name(),
      email: this.user.git.email(),
      username: await this.user.github.username(),
      license: 'ISC',
      python: '3.6.2',
    }
  }

  async prompting() {
    this.answers = {}

    Object.assign(
      this.answers,
      await this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'The package name:',
          default: this.defaults.name,
        },
      ]),
    )

    Object.assign(
      this.answers,
      await this.prompt([
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
          name: 'repository',
          message: 'The repository URL:',
          default: `https://github.com/${this.defaults.username}/${
            this.answers.name
          }/`,
        },
        {
          type: 'input',
          name: 'documentation',
          message: 'The documentation URL:',
          default: `https://${this.answers.name}.readthedocs.io`,
        },
        {
          type: 'input',
          name: 'python',
          message: 'The minimum supported version of Python:',
          default: this.defaults.python,
        },
      ]),
    )

    this.composeWith(require.resolve('generator-license/app'), {
      name: this.answers.author,
      email: this.answers.email,
      website: this.answers.repository,
      defaultLicense: this.defaults.license,
    })
  }

  _spawn(...args) {
    const child = this.spawnCommand(...args)
    return new Promise((resolve, reject) => {
      child.on('exit', ({ code, signal }) => {
        if (code === 0) {
          resolve()
        } else {
          reject({ code, signal })
        }
      })
    })
  }

  // async install() {
  //   await this._spawn('pyenv', ['local', this.answers.python])
  //   await this._spawn('poetry', [
  //     'add',
  //     '--dev',
  //     'mypy',
  //     'pydocstyle',
  //     'pylint',
  //     'pytest',
  //     'pytest-cov',
  //     'sphinx',
  //     'sphinx-autobuild',
  //     'sphinx_rtd_theme',
  //     'toml',
  //   ])
  // }
}