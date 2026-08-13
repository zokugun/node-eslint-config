import fse from '@zokugun/fs-extra-plus/sync'
import { isRecord, isString } from '@zokugun/is-it-type';

export function isModule(cwd: string): boolean {
	const result = fse.readJSON(fse.join(cwd, 'package.json'));

	return  !result.fails && isRecord(result.value) && isString(result.value.type) && result.value.type === 'module';
}
