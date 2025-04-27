const { asyncError } = require('./labAssignment-lab4');

describe('asyncError', () => {
    it('відхиляється з помилкою "Something went wrong"', () => {
      const asyncError = () => {
        return new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Something went wrong'));}); 
        });
      };
  
      expect(asyncError()).rejects.toThrow('Something went wrong');
    });
  });