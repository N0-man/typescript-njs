function summary(r) {
  var a, s, h

  s = 'JS summary\n\n'

  s += 'Method: ' + r.method + '\n'
  s += 'HTTP version: ' + r.httpVersion + '\n'
  s += 'Host: ' + r.headersIn.host + '\n'
  s += 'Remote Address: ' + r.remoteAddress + '\n'
  s += 'URI: ' + r.uri + '\n'

  s += 'Headers:\n'
  for (h in r.headersIn) {
    s += "  header '" + h + "' is '" + r.headersIn[h] + "'\n"
  }

  s += 'Args:\n'
  for (a in r.args) {
    s += "  arg '" + a + "' is '" + r.args[a] + "'\n"
  }

  var cookies = r.headersIn.Cookie;
  var njsCookies =
      cookies &&
      cookies
          .split(';')
          .map((v) => v.split('='))

  s += 'Cookies:\n'
  s += njsCookies

  r.status = 200
  r.headersOut['Content-Type'] = 'text/plain; charset=utf-8'
  r.sendHeader()
  r.send(s)

  r.finish()
}

export default {
  summary
}
