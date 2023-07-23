# Contributing Guidelines

## Code of Conduct

In order to participate your behavior must conform to our [code of conduct](https://github.com/andrewgjohnson/agjCalendar/blob/master/CODE_OF_CONDUCT.md).

## Minified Javascript and CSS

Prior to committing any changes, you should be generating updated minified Javascript and CSS files. The minifier scripts are define in the [gulp.js configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/gulpfile.js). Run this command to generate new minified files:

    gulp

## Coding Conventions

New code should not produce any new errors when the commands below are run. New code that produces new errors will be rejected. Please be consistent with what already exists.

### Javascript

We use the [ESLint](https://eslint.org/) static analysis tool to enforce coding standards in the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/). The plugin uses ESLint’s recommended ruleset in conjunction with [Google’s Javascript style config](https://www.npmjs.com/package/eslint-config-google) as well as some custom rules defined in the [ESLint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/.eslintrc.yml). Run this command to test any changes to the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/):

    npx eslint source\agjCalendar\jquery.agjCalendar.js

We currently allow max line lengths of greater than 80 characters to throw warnings instead of errors by using `"max-len": 1` in the [ESLint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/.eslintrc.yml). Until a refactor of the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/) can occur to get all lines under 80 characters we are allowing contributions even if they throw `max-len` warnings. Run this command to test any changes to the [Javascript source](https://agjcalendar.agjjquery.org/source/javascript/) with warnings suppressed:

    npx eslint source\agjCalendar\jquery.agjCalendar.js --quiet

The [gulp.js configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/gulpfile.js) should also follow the same Javascript coding standards. Run this command to test any changes to `gulpfile.js`:

    npx eslint gulpfile.js

The [examples](https://github.com/andrewgjohnson/agjCalendar/blob/master/examples) should also follow the same Javascript coding standards. Because these examples do not initialize a jQuery object there will be one `no-undef` error thrown per jQuery call; this type of error is acceptable as we want our examples to be as concise as possible. Run this command to test any changes to the example Javascript files:

    npx eslint examples/*.js

### CSS

We use the [Stylelint](https://stylelint.io/) static analysis tool to enforce coding standards in the [CSS source](https://agjcalendar.agjjquery.org/source/css/). The plugin uses [Stylelint’s standard config](https://www.npmjs.com/package/stylelint-config-standard) as well as some custom rules defined in the [Stylelint configuration file](https://github.com/andrewgjohnson/agjCalendar/blob/master/.stylelintrc.yml). Run this command to test any changes to the [CSS source](https://agjcalendar.agjjquery.org/source/css/):

    npx stylelint source\agjCalendar\jquery.agjCalendar.css

## Submitting Changes

Please send a [GitHub Pull Request](https://github.com/andrewgjohnson/agjCalendar/pull/new/master) with a clear list of what you've done (read more about [pull requests](https://help.github.com/articles/about-pull-requests/)). We can always use more test coverage. Please follow our coding conventions (below) and make sure all of your commits are atomic (one feature per commit). Please use our [pull request template](https://github.com/andrewgjohnson/agjCalendar/blob/master/PULL_REQUEST_TEMPLATE.md) when submitting pull requests.

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."
