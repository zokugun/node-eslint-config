import type { Configurator } from '@zokugun/eslint-toolkit';

export function ignores(...files: string[]): Configurator {
	return () => ({
		ignores: files,
	});
}
