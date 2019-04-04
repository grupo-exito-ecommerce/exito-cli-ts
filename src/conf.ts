import { AwsCredentials } from './shared/models/global';
const Configstore = require('configstore');
import { name as pkgName } from '../package.json'

const conf = new Configstore(pkgName)

export const saveAll = (config: any): void => {
    conf.all = config
}
export const saveAccountAws = (credentials: AwsCredentials): void =>
    conf.set('aws_user', credentials)

export const getAll = (): any => conf.all

export const getAwsAccount = (): AwsCredentials =>
    conf.get('aws_user')

export const clear = (): void =>
    conf.clear()