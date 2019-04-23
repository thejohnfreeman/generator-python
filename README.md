# generator-python

A [Yeoman](https://yeoman.io/) generator for a Python 3 package with docs,
lint, tests, and continuous integration.


## Options

Although there are some parameters to this generator, such as the package name
and author, there are no optional pieces. Instead, I recommend you include
every generated file in your first commit, then delete the files you don't
want in your second commit, and go from there. That way, if you ever change
your mind later, you can resurrect the file that was generated for you, not by
re-running the generator and potentially overwriting other files, but by
[asking Git for the version you
deleted](https://stackoverflow.com/a/1113140/61890://stackoverflow.com/a/1113140/618906):

```shell
git checkout $(git rev-list -1 HEAD -- "$file")^ -- "$file"
```

| Option | Type | Description |
| ------ | ---- | ----------- |
| `name` | `string` | The package name. Default is the name of the current directory. |
| `author` | `string` | The author name. Default comes from your Git configuration. This generator assumes a single author. If you need to add more, add them after the generator finishes. |
| `email` | `string` | The author email. Default comes from your Git configuration. |
| `license` | `string` | The package license. Default is [ISC][]. Defers to [generator-license][]. |
| `python` | `string` | The minimum supported version of Python. Default is the maximum required by the default dependencies. |

[ISC]: https://tldrlegal.com/license/-isc-license#summary
[generator-license]: https://github.com/jozefizso/generator-license/


## Why not [Cookiecutter](https://github.com/audreyr/cookiecutter)?

Granted, it seems odd to offer a Python project template through the Node
ecosystem, but Yeoman seems more principled and more polished than
Cookiecutter:

- Yeoman has configuration *functions* out of the box. Cookiecutter puts the
    default configuration in a JSON file. Thus, Cookiecutter cannot handle
    dynamic defaults, e.g. pulling the default author from your Git
    configuration.

- Yeoman has the concept of composable generators, which lets me reuse [someone
    else's implementation of license choices][generator-license]. Cookiecutter
    does not have composable generators.

- A Yeoman generator's dependencies are installed by npm when you install the
  generator. Cookiecutter
  [requires](https://cookiecutter.readthedocs.io/en/latest/advanced/template_extensions.html)
  the *user* to discover and install a generator's dependencies before running
  the generator.

- Yeoman has better looking documentation, which in my opinion is a good
  indicator of project maturity. Cookiecutter has scrambled documentation.
  Some sections are incomplete, and some appear to be duplicates (e.g. ["Learn
  the Basics of Cookiecutter by Creating
  a Cookiecutter"](https://cookiecutter.readthedocs.io/en/latest/first_steps.html)
  and ["Create a Cookiecutter From
  Scratch"](https://cookiecutter.readthedocs.io/en/latest/tutorial2.html)).

- At the time of this writing (2019-04-22), Cookiecutter's master branch was
    last changed 4 months ago, and the docs were last changed 11 months ago,
    which suggests to me that the project is unmaintained. Given the gaps
    above, I do not believe this project is complete enough to transition to
    a maintenance mode.
