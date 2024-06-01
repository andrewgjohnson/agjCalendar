# Contributing Guidelines

## Contribute Code

### Coding Conventions

Please be consistent with what already exists. New code should not produce any new errors/warnings when the commands below are run. New code that produces new errors/warnings may be rejected.

Run the following command to check your changes against our linters and unit tests:

    npm run test

#### Javascript

The plugin uses the [ESLint](https://eslint.org/) static analysis tool to enforce coding standards in the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/). The plugin uses ESLint’s recommended ruleset in conjunction with [Google’s Javascript style config (only without jsdoc)](https://www.npmjs.com/package/eslint-config-google-jsdocless) as well as some custom rules defined in the [ESLint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/eslint.config.js). There are exceptions for configuration files and examples set up to allow longer comments and undefined variables. Run this command to test all code changes:

    npm run lint

Alternatively, run these commands to test any individual changes to the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/), [unit tests](/contribute/#unit-tests), [examples](https://agjcalendar.agjjquery.org/examples/), [ESLint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/eslint.config.js), [Instanbul (nyc) configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/nyc.config.js), [Stylelint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/stylelint.config.js) and [gulp.js configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/gulpfile.js):

    npx eslint source/agjCalendar/jquery.agjCalendar.js
    npx eslint tests/*.js
    npx eslint examples/*.js
    npx eslint eslint.config.js
    npx eslint nyc.config.js
    npx eslint stylelint.config.js
    npx eslint gulpfile.js

#### CSS

The plugin uses the [Stylelint](https://stylelint.io/) static analysis tool to enforce coding standards in the [CSS source](https://agjcalendar.agjjquery.org/source/css/). The plugin uses [Stylelint’s standard config](https://www.npmjs.com/package/stylelint-config-standard) as well as some custom rules defined in the [Stylelint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/stylelint.config.js). Run this command to test all code changes:

    npm run lint

Alternatively, run these commands to test any individual changes to the [CSS source](https://agjcalendar.agjjquery.org/source/css/):

    npx stylelint source/agjCalendar/jquery.agjCalendar.css
    npx stylelint source/agjCalendar/jquery.agjCalendar.themes.css

### Minified Javascript and CSS

Prior to committing any changes, you should be generating updated minified Javascript and CSS files using [gulp.js](https://gulpjs.com/). The minifier scripts are defined in the [gulp.js configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/gulpfile.js). Run this command to generate new minified files:

    gulp

### Unit Tests

The plugin uses jQuery’s [QUnit](https://qunitjs.com/) framework  to run unit tests. The tests are all located in [qunit.js](https://github.com/andrewgjohnson/agjCalendar/blob/master/tests/qunit.js) and can be run online in-browser at [agjCalendar.agjjQuery.org/tests/index.html](https://agjCalendar.agjjQuery.org/tests/index.html). All tests should continue to pass and all new features should ideally include unit tests. Run this command to execute all unit tests:

    npm run qunit

Run this command to view code coverage:

    npm run coverage

### Online Documentation

The plugin’s online documentation is available at [agjCalendar.agjjQuery.org](https://agjCalendar.agjjQuery.org/). Please ensure the documentation is updated along with any code changes. All of the files used to generate the documentation are in the [/documentation/agjCalendar.agjjQuery.org/ folder](https://github.com/andrewgjohnson/agjCalendar/blob/master/documentation/agjCalendar.agjjQuery.org/). [The website](https://agjCalendar.agjjQuery.org/) is powered by [GitHub Pages](https://pages.github.com/) which uses [Jekyll](https://jekyllrb.com/). Run this command to test the online documentation website locally if you have Jekyll installed:

    jekyll serve

### Submitting Changes

Please send a [GitHub Pull Request](https://github.com/andrewgjohnson/agjCalendar/pull/new/master) with a clear list of what you’ve done (read more about [pull requests](https://help.github.com/articles/about-pull-requests/)). Please follow our coding conventions (above) and make sure all of your commits are atomic (one feature per commit). Please use our [pull request template](https://github.com/andrewgjohnson/agjCalendar/blob/master/.github/PULL_REQUEST_TEMPLATE.md) when submitting pull requests.

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."

## Contribute Translations

Although the plugin has built-in support for 20 languages we do not have team members that speak all of these languages. If you spot a translation error within our existing code or have knowledge about a language you would like to add support for please submit a pull request with your changes. Because we want to take advantage of any multilingual volunteers if you know about a language but not how to submit a pull request you can submit details of what should change in [an issue](https://github.com/andrewgjohnson/agjCalendar/issues/new) or [discussion post](https://github.com/andrewgjohnson/agjCalendar/discussions/new) and a team member will help get your changes submitted.

## Contribute Financially

You can contribute financially by becoming a [patron](https://patreon.com/agjopensource) at [patreon.com/agjopensource](https://patreon.com/agjopensource) to support agjCalendar and [other agjjQuery.org plugins](https://agjjquery.org/plugins/).

[![Patreon - Become a Patron](https://raster.shields.io/badge/Patreon%20-become%20a%20Patron-FD334A.png?style=for-the-badge&logo=patreon&logoColor=FD334A)](https://patreon.com/agjopensource)

## Code of Conduct

In order to participate your behaviour must conform to our [code of conduct](https://github.com/andrewgjohnson/agjCalendar/blob/master/.github/CODE_OF_CONDUCT.md).
