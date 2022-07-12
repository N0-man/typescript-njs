function getCookiePayload(name: string, value: string): string {
  return `${name}=${value}; path=/njs; SameSite=None;`;
}

let response = '';
function addLoginCookie(
  request: NginxHTTPRequest,
  data: string | Buffer,
  flags: NginxHTTPSendBufferOptions,
) {
  response += data;
  if (flags.last) {
    const scriptInjectedResponse = response.replace(
      /<\/head>/,
      `<script>document.cookie="${getCookiePayload(
        'login',
        'success',
      )}"</script></head>`,
    );
    request.sendBuffer(scriptInjectedResponse, flags);
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

function summary(request: NginxHTTPRequest) {
  if (haveLoginCookie(request.headersIn.Cookie)) {
    let summary: string;

    summary = 'JS summary\n\n';
    summary += 'Method: ' + request.method + '\n';
    summary += 'HTTP version: ' + request.httpVersion + '\n';
    summary += 'Host: ' + request.headersIn.host + '\n';
    summary += 'Remote Address: ' + request.remoteAddress + '\n';
    summary += 'URI: ' + request.uri + '\n';
    summary += extractHeaders() + extractArguments() + extractCookies();

    request.status = 200;
    request.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
    request.sendHeader();
    request.send(summary);

    request.finish();
  } else {
    request.internalRedirect('/error');
  }

  function extractHeaders() {
    let headers = 'Headers:\n';
    for (const h in request.headersIn) {
      headers += "  header '" + h + "' is '" + request.headersIn[h] + "'\n";
    }
    return headers;
  }

  function extractCookies() {
    if (request.headersIn.Cookie) {
      return (
        'Cookies:\n' +
        request.headersIn.Cookie.split(';').map((v) => v.split('='))
      );
    } else return 'Cookies: NaN';
  }

  function extractArguments() {
    let args = 'Args:\n';
    for (const a in request.args) {
      args += "  arg '" + a + "' is '" + request.args[a] + "'\n";
    }
    return args;
  }
}

export default { summary, addLoginCookie };
