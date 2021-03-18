import { promises as fs } from "fs";
import { RequestMock } from "../domain/RequestMock";

const CACHE_DIR = "./.cache";

const buildCachePath = (path: string) => {
  let base = `${CACHE_DIR}/${path}`.replace("//", "/");
  if (base.endsWith("/")) {
    base = base.substring(0, base.length - 1);
  }
  return base;
};
const removeDir = async (path: string) => fs.rmdir(path, { recursive: true });

const clearDir = async (dir: string) => {
  const files = await listFiles(dir);
  for (const file of files) {
    await fs.rm(`${dir}/${file}`);
  }
};

const listFiles = async (dir: string) => {
  const files = await fs.readdir(dir).catch(() => []);
  const res: string[] = [];
  for (const file of files) {
    if ((await fs.lstat(`${dir}/${file}`)).isFile()) {
      res.push(file);
    }
  }
  return res.sort();
};

const readJson = async <T>(path: string): Promise<T> => {
  const file = await fs.readFile(buildCachePath(path), "utf-8");
  return JSON.parse(file);
};

export default {
  clearAll: () => removeDir(CACHE_DIR),
  clear: (path: string) => clearDir(buildCachePath(path)),
  save: async (path: string, mock: RequestMock) => {
    const dir = buildCachePath(path);
    await fs.mkdir(dir, { recursive: true });
    if (mock.static) {
      await clearDir(dir);
      return fs.writeFile(`${dir}/static.json`, JSON.stringify(mock));
    } else {
      const files = await listFiles(dir);
      const stat = files.find((name) => name.startsWith("static"));
      if (stat) {
        return stat;
      } else {
        const last = files.pop();
        const id = last ? Number(last.split(".")[0]) + 1 : 0;
        return fs.writeFile(`${dir}/${id}.json`, JSON.stringify(mock));
      }
    }
  },
  pop: async (path: string): Promise<RequestMock | undefined> => {
    const dir = buildCachePath(path);
    const files = await listFiles(dir);
    if (files?.length > 0) {
      const file: RequestMock = await readJson(`${path}/${files[0]}`);
      if (!file.static) {
        await fs.rm(`${dir}/${files[0]}`);
      }
      return file;
    }
  },
  get: async (path: string): Promise<RequestMock[]> => {
    const dir = buildCachePath(path);
    const files = await listFiles(dir);
    const res: RequestMock[] = [];
    for (const file of files) {
      res.push(await readJson<RequestMock>(`${path}/${file}`));
    }
    return res;
  },
};
