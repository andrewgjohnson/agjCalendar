# Contributing Guidelines

## Code of Conduct

In order to participate your behaviour must conform to our [code of conduct](https://github.com/andrewgjohnson/agjCalendar/blob/master/.github/CODE_OF_CONDUCT.md).

## Minified Javascript and CSS

Prior to committing any changes, you should be generating updated minified Javascript and CSS files. The minifier scripts are defined in the [gulp.js configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/gulpfile.js). Run this command to generate new minified files:

    gulp

## Coding Conventions

New code should not produce any new errors when the commands below are run. New code that produces new errors will be rejected. Please be consistent with what already exists.

### Javascript

We use the [ESLint](https://eslint.org/) static analysis tool to enforce coding standards in the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/). The plugin uses ESLint’s recommended ruleset in conjunction with [Google’s Javascript style config](https://www.npmjs.com/package/eslint-config-google) as well as some custom rules defined in the [ESLint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/.eslintrc.yml). Run this command to test any changes to the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/):

    npx eslint source/agjCalendar/jquery.agjCalendar.js

The [eslint.config.js configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/eslint.config.js) should also follow the same Javascript coding standards. Run this command to test any changes to `eslint.config.js`:

    npx eslint eslint.config.js

The [gulp.js configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/gulpfile.js) should also follow the same Javascript coding standards. Run this command to test any changes to `gulpfile.js`:

    npx eslint gulpfile.js

The [examples](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples) should also follow the same Javascript coding standards. Because these examples do not initialize a jQuery object there will be one `no-undef` error thrown per jQuery call; this type of error is acceptable as we want our examples to be as concise as possible. There will also be one `jsdoc/require-file-overview` error thrown per file due to a lack of JSDoc block up top including a `@file` value. Run this command to test any changes to the example Javascript files:

    npx eslint examples/*.js

### CSS

We use the [Stylelint](https://stylelint.io/) static analysis tool to enforce coding standards in the [CSS source](https://agjcalendar.agjjquery.org/source/css/). The plugin uses [Stylelint’s standard config](https://www.npmjs.com/package/stylelint-config-standard) as well as some custom rules defined in the [Stylelint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/.stylelintrc.yml). Run these commands to test any changes to the [CSS source](https://agjcalendar.agjjquery.org/source/css/):

    npx stylelint source/agjCalendar/jquery.agjCalendar.css
    npx stylelint source/agjCalendar/jquery.agjCalendar.themes.css

## Submitting Changes

Please send a [GitHub Pull Request](https://github.com/andrewgjohnson/agjCalendar/pull/new/master) with a clear list of what you’ve done (read more about [pull requests](https://help.github.com/articles/about-pull-requests/)). We can always use more test coverage. Please follow our coding conventions (above) and make sure all of your commits are atomic (one feature per commit). Please use our [pull request template](https://github.com/andrewgjohnson/agjCalendar/blob/master/PULL_REQUEST_TEMPLATE.md) when submitting pull requests.

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."
