[@zokugun/eslint-config](https://github.com/zokugun/node-eslint-config)
=======================================================================

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@zokugun/eslint-config?color=brightgreen)](https://www.npmjs.com/package/@zokugun/eslint-config)
[![NodeJS Version](https://img.shields.io/badge/node.js-%3E%3D%2020.19-green)](#requirements)
[![Modules](https://img.shields.io/badge/modules-ESM-green)](#requirements)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-f87171?logo=kofi&logoColor=white)](https://ko-fi.com/daiyam)
[![Liberapay](https://img.shields.io/badge/Liberapay-facc15?logo=liberapay&logoColor=black)](https://liberapay.com/daiyam/donate)
[![PayPal](https://img.shields.io/badge/PayPal-5277C3?logo=paypal&logoColor=white)](https://paypal.me/daiyam99)

> This package streamlines ESLint configuration by providing helper functions for ignores, gitignore integration, and dynamic value resolution based on project settings.

Features
--------

- **Easy Configuration**: Pass a list of functions to generate a complete ESLint config.
- **Flexible Configs**: Supports both function-based and object-based configs.
- **Functional Composition**: Chain multiple configurators to build a complex final config.
- **Context Resolution**: Store and share values across configurator functions.
- **EditorConfig Integration**: Pull formatting rules from `.editorconfig` files.
- **Git Integration**: Returns a configurator that adds ignores from `.gitignore`.

Installation
------------

```bash
npm add @zokugun/eslint-config
```

Requirements
------------

- **ESLint**: `v10` or higher
- **Node.js**: `v20.19` or higher
- **Modules**: ECMAScript Modules (`ESM`)

Quick Start
-----------

```typescript
import { configure, gitignore, ignores } from '@zokugun/eslint-config';
import { javascript, regexp } from '@zokugun/eslint-config-js';
import { nodejs } from '@zokugun/eslint-config-nodejs';
import { importX, perfectionist, stylistic } from '@zokugun/eslint-config-style';
import { typescript } from '@zokugun/eslint-config-ts';

export default configure([
	ignores(),
	gitignore(),
	nodejs(),
	stylistic(),
	javascript(),
	typescript(),
	importX(),
	perfectionist(),
	regexp(),
]);
```

API reference
-------------

```typescript
function configure(configurators: Array<Configurator | Linter.Config>, options?: { cwd?: string } | null): Linter.Config[];
function gitignore(): Configurator;
function ignores(...files: string[]): Configurator;
```

Contributions
-------------

Contributions are most welcome. Please:
- Open issues and feature requests under the repository discussions.
- Follow the [`CONTRIBUTING.md`](./CONTRIBUTING.md).

Donations
---------

Support this project by becoming a financial contributor.

<table>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_kofi.png" alt="Ko-fi" width="80px" height="80px"></td>
        <td><a href="https://ko-fi.com/daiyam" target="_blank">ko-fi.com/daiyam</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_liberapay.png" alt="Liberapay" width="80px" height="80px"></td>
        <td><a href="https://liberapay.com/daiyam/donate" target="_blank">liberapay.com/daiyam/donate</a></td>
    </tr>
    <tr>
        <td><img src="https://raw.githubusercontent.com/daiyam/assets/master/icons/256/funding_paypal.png" alt="PayPal" width="80px" height="80px"></td>
        <td><a href="https://paypal.me/daiyam99" target="_blank">paypal.me/daiyam99</a></td>
    </tr>
</table>

License
-------

Copyright &copy; 2026-present Baptiste Augrain

Licensed under the [MIT license](https://opensource.org/licenses/MIT).
