import 'mocha';
import 'should';

import {HelloWorld} from '../hello-world';

describe('HelloWorld', () => {
  let tested: HelloWorld;

  beforeEach(() => (tested = new HelloWorld()));

  describe('Say hi, ()', () => {
    it('should say Hello, adrian', () => {
      const result = tested.sayHello('adrian');
      const expected = 'Hello, adrian';
      result.should.be.equal(expected);
    });

    it('should say Hello, world', () => {
      const result = tested.sayHello('world');
      const expected = 'Hello, world';
      result.should.be.equal(expected);
    });
  });
});
