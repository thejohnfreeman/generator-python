.. start-include

<%- '='.repeat(package_name.length) %>
<%- package_name %>
<%- '='.repeat(package_name.length) %>

.. image:: https://travis-ci.org/<%- username %>/<%- project_name %>.svg?branch=master
   :target: https://travis-ci.org/<%- username %>/<%- project_name %>
   :alt: Build status: Linux and OSX

.. image:: https://ci.appveyor.com/api/projects/status/github/<%- username %>/<%- project_name %>?branch=master&svg=true
   :target: https://ci.appveyor.com/project/<%- username %>/<%- project_name %>
   :alt: Build status: Windows

.. image:: https://readthedocs.org/projects/<%- project_name %>/badge/?version=latest
   :target: https://<%- project_name %>.readthedocs.io/
   :alt: Documentation status

.. image:: https://img.shields.io/pypi/v/<%- package_name %>.svg
   :target: https://pypi.org/project/<%- package_name %>/
   :alt: Latest PyPI version

.. image:: https://img.shields.io/pypi/pyversions/<%- package_name %>.svg
   :target: https://pypi.org/project/<%- package_name %>/
   :alt: Python versions supported

.. end-include
