import type { Configurator } from '@zokugun/eslint-toolkit';

import plugin from 'eslint-config-flat-gitignore';

export function gitignore(): Configurator {
	return () => plugin();
}
