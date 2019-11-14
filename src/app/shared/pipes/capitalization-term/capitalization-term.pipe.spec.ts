import { CapitalizationTermPipe } from './capitalization-term.pipe';

describe('CapitalizationTermPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizationTermPipe();
    expect(pipe).toBeTruthy();
  });
});
