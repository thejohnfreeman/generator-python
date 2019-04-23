const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.defaults = {
      name: this.determineAppname().replace(/[^a-zA-Z0-9_]/, '_'),
      author: this.user.git.name(),
      email: this.user.git.email(),
      license: 'ISC',
      python: '3.6.2',
    }
  }

  initializing() {
    this.composeWith(require.resolve('generator-license/app'), {
      name: this.defaults.author,
      email: this.defaults.email,
      // There is no way to prompt for the website before composing with
      // `generator-license`. Let the user add it manually.
      website: '',
      defaultLicense: this.defaults.license,
    })
  }

  async prompting() {
    this.config = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'The package name:',
        default: this.defaults.name,
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
        name: 'python',
        message: 'The minimum supported version of Python:',
        default: this.defaults.python,
        store: true,
      },
    ])
  }
}
