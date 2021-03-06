# generator-python

A [Yeoman][] generator for a Python 3 package with docs, lint, tests, and
continuous integration.

[Yeoman]: https://yeoman.io/

[![npm](https://img.shields.io/npm/v/@thejohnfreeman/generator-python.svg)](https://www.npmjs.com/package/@thejohnfreeman/generator-python)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)


## Preview

Take a look at the [sample
project](https://github.com/thejohnfreeman/project-template-python) built with
this generator. It is tested on [Travis
CI](https://travis-ci.org/thejohnfreeman/project-template-python) and
published on [PyPI](https://pypi.org/project/project_template/) with
documentation on [Read the
Docs](https://project-template-python.readthedocs.io/).


## Install

This generator assumes you are using [Poetry][] for managing Python packages.
It will use whatever Python version is activated in your environment.
I recommend using [pyenv][] to manage different versions of Python.

[pyenv]: https://github.com/pyenv/pyenv
[Poetry]: https://poetry.eustace.io/

```shell
# Required
$ curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
$ yarn global add yo @thejohnfreeman/generator-python
# Optional
$ curl https://pyenv.run | bash
```


## Use

From **within your project directory**:

```shell
$ pyenv local 3.6-dev
$ yo @thejohnfreeman/python
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
| `project_name` | `string` | The project name. The project namespace is distinct from the package namespace. Think GitHub and Read the Docs, where your project coexists with projects from other language ecosystems. Default is the name of the current directory. |
| `package_or_module` | `"package"`<br />`"module"` | Whether this will be a package (directory) or module (single file). |
| `package_name` | `string` | The package (or module) name, i.e. the name your users will import.This will be the name of your PyPI package, too, but if that name is already taken, you will need to change it in `pyproject.toml` and `README.rst`. Default is the project name sanitized to a Python identifier. |
| `version` | `string` | The first version string. Default is `0.1.0`. |
| `author` | `string` | The author name. Default comes from your Git configuration. This generator assumes a single author. If you need to add more, add them after the generator finishes. |
| `email` | `string` | The author email. Default comes from your Git configuration. |
| `repository` | `string` | The repository URL. Default is the project name within your namespace on [`github.com`](https://github.com). |
| `python` | <code>"3.6&#8209;dev"</code><br /><code>"3.7&#8209;dev"</code><br /><code>"3.8&#8209;dev"</code> | The minimum supported version of Python. Default is 3.6-dev. |

[ISC]: https://tldrlegal.com/license/-isc-license#summary
[generator-license]: https://github.com/jozefizso/generator-license/


## Why not [Cookiecutter](https://github.com/audreyr/cookiecutter)?

I explain my reasons on [my
blog](https://jfreeman.dev/blog/2019/04/24/cookiecutter-vs-yeoman/).
