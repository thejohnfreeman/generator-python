.. start-include

<%- '='.repeat(package_name.length) %>
<%- package_name %>
<%- '='.repeat(package_name.length) %>

.. image:: https://travis-ci.org/<%- username %>/<%- project_name %>.svg?branch=master
   :target: https://travis-ci.org/<%- username %>/<%- project_name %>
   :alt: Build status

.. image:: https://readthedocs.org/projects/<%- project_name %>/badge/?version=latest
   :target: https://<%- project_name %>.readthedocs.io/
   :alt: Documentation status

.. image:: https://img.shields.io/pypi/v/<%- package_name %>.py.svg
   :target: https://pypi.org/project/<%- package_name %>.py/
   :alt: Latest PyPI version

.. image:: https://img.shields.io/pypi/pyversions/<%- package_name %>.py.svg
   :target: https://pypi.org/project/<%- package_name %>.py/
   :alt: Python versions supported

.. end-include
