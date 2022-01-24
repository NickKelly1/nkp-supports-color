# @nkp/supports-color

[![npm version](https://badge.fury.io/js/%40nkp%2Fsupports-color.svg)](https://www.npmjs.com/package/@nkp/supports-color)
[![deploy status](https://github.com/nickkelly1/supports-color/actions/workflows/release.yml/badge.svg)](https://github.com/nickkelly1/supports-color/actions/workflows/release.yml)
[![known vulnerabilities](https://snyk.io/test/github/nickkelly1/supports-color/badge.svg)](https://snyk.io/test/github/nickkelly1/supports-color)

Detect whether a terminal supports color.

Fork of [`supports-color`](https://github.com/chalk/supports-color) with support for both ESM and CommonJS.

## Table of contents

- [Fork](#fork)
- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [pnpm](#pnpm)
  - [Exports](#exports)
- [Usage](#usage)
- [Updating Dependencies](#updating-dependencies)

## Fork

`@nkp/supports-color` is a fork of [`supports-color`](https://github.com/chalk/supports-color) that exports both ESM and CommonJS.

In 2021 [Sindre Sorhus](https://gist.github.com/sindresorhus), prolific creator and maintainer of many popular [`npm packages`](https://www.npmjs.com/~sindresorhus), [including some with over 150 million weekly monthly downloads](https://www.npmjs.com/package/chalk), pushed a new major version of many of his packages removing CommonJS support and making them ["pure ESM"](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). This was a major breaking change. Sindre's universally popular packages were now incompatible with a large parts of the NodeJS ecosystem.

Sindre's packages could have been kept backwards compatible by producing both ESM and CJS exports, however [Sindre believed he could push the NodeJS community to adopt ESM sooner by introducing breaking changes](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77).

> Personally, I plan to (migrate to Pure ESM *instead* of provide backwards compatibility) as I think it’s better to rip off the bandaid and push the ecosystem forward.

[For many, the breaking change's haven't gone over well](https://gist.github.com/joepie91/bca2fda868c1e8b2c2caf76af7dfcad3). Many project's now find themselves spending hours, days or even weeks trying to placate these pure EMS packages only to find too many incompatibilities and revert back.

Hence this fork. `@nkp/supports-color` is intended to be an functionally equivalent clone of `styles-ansi` but with both ESM and CJS exports.

## Installation

### npm

```sh
npm install @nkp/supports-color
```

### yarn

```sh
yarn add @nkp/supports-color
```

### pnpm

```sh
pnpm add @nkp/supports-color
```

### Exports

`@nkp/supports-color` targets CommonJS and ES modules. To utilise ES modules consider using a bundler or setting `package.json#module` to `module`.

## Updating dependencies

To update dependencies run one of

```sh
# if npm
# update package.json
npx npm-check-updates -u
# install
npm install

# if yarn
# update package.json
yarn create npm-check-updates -u
# install
yarn

# if pnpm
# update package.json
pnpx npm-check-updates -u
# install
pnpm install
```

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
