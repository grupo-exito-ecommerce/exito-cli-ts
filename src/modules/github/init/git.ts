import { consts } from './../../../shared/constants';
import { copy, emptyDir, remove } from 'fs-extra';
import pipeStreams from 'pipe-streams-to-promise';
import request from 'request';
import unzip from 'unzip-stream';
import log from '../../../shared/logger';

const urlForRepo = (repo: string) =>
  `https://github.com/${consts.github_account}/${repo}/archive/master.zip`;

const fetchAndUnzip = async (url: string, path: string) =>
  pipeStreams([request(url), unzip.Extract({ path })]);

export const clone = async (repo: string) => {
  const cwd = process.cwd();
  const url = urlForRepo(repo);
  const cloned = `${cwd}/${repo}-master`;
  log.debug(url);
  await emptyDir(cwd);
  await fetchAndUnzip(url, cwd);
  await copy(cloned, cwd);
  await remove(cloned);
};

export const download = async (repo: string): Promise<Boolean> => {
  try {
    const cwd = process.cwd();
    const url = urlForRepo(repo);
    const cloned = `${cwd}/${repo}-master`;
    await fetchAndUnzip(url, cwd);
    await copy(cloned, cwd);
    await remove(cloned);
    return true;
  } catch (error) {
    log.debug(`Error on clone project ${error}`);
    return false;
  }
};
