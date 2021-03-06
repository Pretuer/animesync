import * as app from '../../..';
import {HttpsProxyAgent} from 'https-proxy-agent';
import https from 'https';
import url from 'url';

export function httpAsync(requestUrl: string) {
  const agent = app.settings.proxyServer
    ? new HttpsProxyAgent(app.settings.proxyServer)
    : undefined;
  return new Promise<string>((resolve, reject) => {
    const options = url.parse(requestUrl);
    https.get(Object.assign(options as https.RequestOptions, {agent}), (res) => {
      let chunk = '';
      res.on('data', (x) => chunk += x);
      res.on('end', () => resolve(chunk));
      res.on('error', (err) => reject(err));
    }).on('error', (err) => reject(err));
  });
}
