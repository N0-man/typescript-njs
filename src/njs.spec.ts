import { createMock } from 'ts-auto-mock';
import { On, method } from "ts-auto-mock/extension";
import njs from './njs';

describe('testing jest on typescript', () => {
  test('return value', () => {
    expect(njs.testFunction()).toBe('test');
  });

  test('test summary', () => {
    const expectedSummary = getExpectedSummary()
    const mockRequest: NginxHTTPRequest = createMock<NginxHTTPRequest>({
      args: {
        test: "123"
      },
      headersIn: {
        'Cookie': "login=success",
        'host': 'local.test'
      },
      method: "GET",
      uri: "http://localhost",
      remoteAddress: "localhost",
      httpVersion: "007"
    });
    const mockSendHeader = On(mockRequest).get(method(request => request.sendHeader));
    const mockSend = On(mockRequest).get(method(request => request.send));
    const mockFinish = On(mockRequest).get(method(request => request.finish));
    njs.summary(mockRequest)
    expect(mockSendHeader).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockFinish).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(expectedSummary);
  })
});

function getExpectedSummary() {
  let summary: string;

  summary = 'JS summary\n\n';
  summary += 'Method: GET\n';
  summary += 'HTTP version: 007\n';
  summary += 'Host: local.test\n';
  summary += 'Remote Address: localhost\n';
  summary += 'URI: http://localhost\n';
  summary += 'Headers:\n';
  summary += "  header 'Cookie' is 'login=success'\n";
  summary += "  header 'host' is 'local.test'\n";
  summary += 'Args:\n';
  summary += "  arg 'test' is '123'\n";
  summary += 'Cookies:\n';
  summary += 'login,success';
  return summary
}
