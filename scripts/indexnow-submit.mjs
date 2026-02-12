import { readFile } from 'fs/promises';

const INDEXNOW_ENDPOINT = 'https://yandex.com/indexnow';
const DEFAULT_HOST = 'tecai.ru';
const DEFAULT_KEY = '93f6c03b41f24b37a8fe470f5de7df4a';
const DEFAULT_KEY_LOCATION = `https://${DEFAULT_HOST}/${DEFAULT_KEY}.txt`;
const SITEMAP_PATH = new URL('../public/sitemap.xml', import.meta.url);

const host = process.env.INDEXNOW_HOST || DEFAULT_HOST;
const key = process.env.INDEXNOW_KEY || DEFAULT_KEY;
const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `https://${host}/${key}.txt`;

const extractUrlsFromSitemap = (xml) => {
  const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return [...new Set(locMatches.map((m) => m[1]).filter(Boolean))];
};

const main = async () => {
  const xml = await readFile(SITEMAP_PATH, 'utf-8');
  const urlList = extractUrlsFromSitemap(xml);

  if (!urlList.length) {
    throw new Error('No URLs found in public/sitemap.xml');
  }

  const payload = {
    host,
    key,
    keyLocation: keyLocation || DEFAULT_KEY_LOCATION,
    urlList,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`IndexNow failed: ${response.status} ${response.statusText} :: ${responseText}`);
  }

  console.log(`IndexNow submitted ${urlList.length} URL(s) to ${INDEXNOW_ENDPOINT}`);
  console.log(responseText || 'OK');
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
