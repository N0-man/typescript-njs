import njs from './njs';

describe('testing jest on typescript', () => {
  test('return value', () => {
    expect(njs.testFunction()).toBe('test');
  });

  test('test summary', () => {
    const summary = njs.summary(mockRequest())
  })
});

function mockRequest(): NginxHTTPRequest {
  const request: NginxHTTPRequest = {
    args: undefined,
    done: function (): void {
      throw new Error('Function not implemented.');
    },
    error: function (message: NjsStringOrBuffer): void {
      throw new Error('Function not implemented.');
    },
    finish: function (): void {
      throw new Error('Function not implemented.');
    },
    headersIn: undefined,
    headersOut: undefined,
    httpVersion: undefined,
    internalRedirect: function (uri: NjsStringOrBuffer): void {
      throw new Error('Function not implemented.');
    },
    log: function (message: NjsStringOrBuffer): void {
      throw new Error('Function not implemented.');
    },
    method: undefined,
    remoteAddress: undefined,
    return: function (status: number, body?: NjsStringOrBuffer | undefined): void {
      throw new Error('Function not implemented.');
    },
    send: function (part: NjsStringOrBuffer): void {
      throw new Error('Function not implemented.');
    },
    sendBuffer: function (data: NjsStringOrBuffer, options?: NginxHTTPSendBufferOptions | undefined): void {
      throw new Error('Function not implemented.');
    },
    sendHeader: function (): void {
      throw new Error('Function not implemented.');
    },
    status: 0,
    subrequest: function (uri: NjsStringOrBuffer, options: NginxSubrequestOptions & { detached: true; }): void {
      throw new Error('Function not implemented.');
    },
    uri: undefined,
    rawVariables: undefined,
    variables: undefined,
    warn: function (message: NjsStringOrBuffer): void {
      throw new Error('Function not implemented.');
    }
  }

  return request
}
