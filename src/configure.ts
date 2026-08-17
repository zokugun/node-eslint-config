import type { Linter } from 'eslint';
import type { Configurator, Resolver } from '@zokugun/eslint-toolkit';

import fse from '@zokugun/fs-extra-plus/sync'
import { type IniResult, parseINI } from '@zokugun/ini-parse-lite';
import { isArray, isFunction, isNullable } from '@zokugun/is-it-type';

import { getEditorConfigSection } from './utils/getEditorConfigSection.js';
import { isModule } from './utils/isModule.js';

type Options = {
	cwd?: string;
};

export function configure(configurators: Array<Configurator | Linter.Config>, options?: Options | null): Linter.Config[] {
	const {cwd = process.cwd()} = options ?? {};
	const editorConfigPath = fse.join(cwd, '.editorconfig');

	let editorConfig: IniResult | undefined

	if(fse.isExisting(editorConfigPath)) {
		const content = fse.readFile(editorConfigPath, 'utf8');
		if(content.fails) {
			throw content.error;
		}

		editorConfig = parseINI(content.value);
	}

	const values: Record<string, unknown> = Object.create(null);

	values['cwd'] = cwd;
	values['isModule'] = isModule(cwd);

	const resolve: Resolver = <T>(name: string, defaultValue?: T | T[]): T[] | T | undefined => {
		if(name === '__proto__') {
			return undefined;
		}

		if(name.startsWith('editorconfig/')) {
			if(editorConfig) {
				const ext = name.slice(13);

				return getEditorConfigSection(ext, editorConfig) as T;
			}
			else {
				return undefined;
			}
		}

		const value = values[name];

		if(isNullable(value)) {
			return defaultValue;
		}

		if(isArray(defaultValue) && !isArray(value)) {
			return [value] as T[];
		}

		return value as T;
	}

	const register = (name: string, value: unknown) => {
		if(name === '__proto__') {
			return;
		}
		else if(name in values) {
			if(Array.isArray(values[name])) {
				values[name].push(value);
			}
			else {
				values[name] = [values[name], value];
			}
		}
		else {
			values[name] = value;
		}
	}

	const result: Linter.Config[] = [];

	for(const configure of configurators) {
		if(isFunction(configure)) {
			const configs = configure(resolve, register);

			if(configs) {
				if(Array.isArray(configs)) {
					result.push(...configs);
				}
				else {
					result.push(configs);
				}
			}
		}
		else {
			result.push(configure);
		}
	}

	return result;
}
