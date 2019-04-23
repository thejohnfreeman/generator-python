# generator-python

A [Yeoman][] generator for a Python 3 package with docs, lint, tests, and
continuous integration.

[Yeoman](https://yeoman.io/)


## Options

Although there are some parameters to this generator, such as the package name
and author, there are no optional components. Instead, I recommend you include
every generated file in your first commit, then delete the files you don't
want in your second commit, and go from there. That way, if you ever change
your mind later, you can resurrect the file that was generated for you, not by
re-running the generator and potentially overwriting other files, but by
[asking Git for the version you
deleted](https://stackoverflow.com/a/1113140/61890://stackoverflow.com/a/1113140/618906):

```shell
git checkout $(git rev-list -1 HEAD -- "$file")^ -- "$file"
```
