import { EditorConfigOptions } from '@zokugun/eslint-toolkit';
import { IniResult } from '@zokugun/ini-parse-lite';

export function getEditorConfigSection(pattern: string, config: IniResult): EditorConfigOptions | undefined {
	for(const [key, section] of Object.entries(config)) {
		if(key === pattern || key.includes(`{${pattern}`) || key.includes(`,${pattern}`)) {
			return section;
		}
	}

	if(config['*']) {
		return config['*'];
	}

	return undefined;
}
