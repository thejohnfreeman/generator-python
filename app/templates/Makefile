.PHONY : html lint test serve

PACKAGE := <%- name %>

html :
	${MAKE} -C docs html

lint :
	mypy ${PACKAGE} tests
	pylint ${PACKAGE} tests

serve :
	sphinx-autobuild docs docs/_build/html --host 0.0.0.0 --watch .

test :
	pytest --cov=${PACKAGE} --doctest-modules --ignore=docs
