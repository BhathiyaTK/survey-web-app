import { JsonFormatterPipe } from './json-formatter.pipe';

describe('JsonFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
