function getCookiePayload(name: string, value: string): string {
  // const date = new Date();
  // date.setTime(date.getTime() + validHours * 1000 * 60 * 60);
  // const dateTime = date.getTime();

  // return the cookie
  // return `${name}=${value}; expires=${date.toUTCString()}; path=/njs`;
  return `${name}=${value}; path=/njs; SameSite=None;`;
}

let response = '';
function addLoginCookie(
  r: NginxHTTPRequest,
  data: string | Buffer,
  flags: NginxHTTPSendBufferOptions,
) {
  response += data;

  if (flags.last) {
    const signature = `${r.headersIn['User-Agent']}${r.remoteAddress}`;
    const injectedResponse = response.replace(
      /<\/head>/,
      `<script>document.cookie="${getCookiePayload(
        'login',
        'success',
      )}"</script></head>`,
    );
    r.sendBuffer(injectedResponse, flags);
  }
}

function haveLoginCookie(cookies: string | undefined) {
  return (
    cookies &&
    cookies
      .split(';')
      .reduce((acc, curr) => acc || curr === 'login=success', false)
  );
}

function summary(r: NginxHTTPRequest) {
  if (haveLoginCookie(r.headersIn.Cookie)) {
    var a, s, h;

    s = 'JS summary\n\n';

    s += 'Method: ' + r.method + '\n';
    s += 'HTTP version: ' + r.httpVersion + '\n';
    s += 'Host: ' + r.headersIn.host + '\n';
    s += 'Remote Address: ' + r.remoteAddress + '\n';
    s += 'URI: ' + r.uri + '\n';

    s += 'Headers:\n';
    for (h in r.headersIn) {
      s += "  header '" + h + "' is '" + r.headersIn[h] + "'\n";
    }

    s += 'Args:\n';
    for (a in r.args) {
      s += "  arg '" + a + "' is '" + r.args[a] + "'\n";
    }

    const cookies = r.headersIn.Cookie;
    const njsCookies = cookies && cookies.split(';').map((v) => v.split('='));

    s += 'Cookies:\n';
    s += njsCookies;

    r.status = 200;
    r.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
    r.sendHeader();
    r.send(s);

    r.finish();
  } else {
    r.internalRedirect('/error');
  }
}

const njs = { summary, addLoginCookie };

export default njs;
