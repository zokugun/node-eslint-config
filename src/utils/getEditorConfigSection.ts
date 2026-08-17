import { EditorConfigOptions } from '@zokugun/eslint-toolkit';
import { IniResult } from '@zokugun/ini-parse-lite';

const WORD_REGEX = /^\w+$/

export function getEditorConfigSection(pattern: string, config: IniResult): EditorConfigOptions | undefined {
	const lookup = WORD_REGEX.test(pattern) ? `*.${pattern}` : pattern;

	for(const [key, section] of Object.entries(config)) {
		if(key === lookup || key.includes(`{${lookup}`) || key.includes(`,${lookup}`)) {
			return section;
		}
	}

	if(config['*']) {
		return config['*'];
	}

	return undefined;
}
