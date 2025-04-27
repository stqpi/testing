const { asyncHello } = require('./labAssignment-lab4');

describe('asyncHello', () => {
    it('повинен вирішуватися рядком "hello world"', async () => {
      const asyncHello = () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('hello world');
          }, 10); 
        });
      };
  
      const result = await asyncHello();
      expect(result).toBe('hello world');
    });
  });