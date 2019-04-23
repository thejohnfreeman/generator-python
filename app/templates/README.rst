<%- '='.repeat(name.length) %>
<%- name %>
<%- '='.repeat(name.length) %>

.. start-include

.. image:: https://travis-ci.org/<%- username %>/<%- name %>.svg?branch=master
   :target: https://travis-ci.org/<%- username %>/<%- name %>
   :alt: Build status

.. image:: https://readthedocs.org/projects/<%- name %>/badge/?version=latest
   :target: https://<%- name %>.readthedocs.io/en/latest/?badge=latest
   :alt: Documentation status

.. image:: https://img.shields.io/pypi/v/<%- name %>.py.svg
   :target: https://pypi.org/project/<%- name %>.py/
   :alt: Latest PyPI version

.. image:: https://img.shields.io/pypi/pyversions/<%- name %>.py.svg
   :target: https://pypi.org/project/<%- name %>.py/
   :alt: Python versions supported

.. end-include
