# generator-python

A [Yeoman][] generator for a Python 3 package with docs, lint, tests, and
continuous integration.

[Yeoman]: https://yeoman.io/


## Install

```shell
$ yarn global add yeoman @thejohnfreeman/generator-python
```

This generator assumes you are using [pyenv](https://github.com/pyenv/pyenv)
for managing Python versions and [Poetry][] for managing Python packages.

[Poetry]: https://poetry.eustace.io/

```shell
$ curl -sSL https://pyenv.run | bash
$ curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
```


## Use

From within your project directory:

```shell
$ yo python
```


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
$ git checkout $(git rev-list -1 HEAD -- "$file")^ -- "$file"
```

| Option | Type | Description |
| ------ | ---- | ----------- |
| `name` | `string` | The package name. Default is the name of the current directory. |
| `version` | `string` | The first version string. Default is `0.1.0`. |
| `author` | `string` | The author name. Default comes from your Git configuration. This generator assumes a single author. If you need to add more, add them after the generator finishes. |
| `email` | `string` | The author email. Default comes from your Git configuration. |
| `repository` | `string` | The repository URL. Default is the package name within your namespace on [`github.com`](https://github.com). |
| `documentation` | `string` | The documentation URL. Default is the package name on [`readthedocs.org`](https://readthedocs.org/). |
| `python` | `string` | The minimum supported version of Python. Default is the maximum required by the default dependencies. |

[ISC]: https://tldrlegal.com/license/-isc-license#summary
[generator-license]: https://github.com/jozefizso/generator-license/


## Why not [Cookiecutter](https://github.com/audreyr/cookiecutter)?

I explain my reasons on [my
blog](https://jfreeman.dev/blog/2019/04/24/cookiecutter-vs-yeoman/).
