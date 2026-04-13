import { asyncOperationDemo } from './index.js';
import { jest } from '@jest/globals';

describe('Event Loop: Повна черговість', () => {
  test('має виконувати чергу: nextTick -> Promise -> Macrotasks', async () => {
    const executionOrder = [];
    
    const callback = (op) => {
      executionOrder.push(op);
    };

    // Ждем завершения основной части функции
    await asyncOperationDemo(callback);

    // Даем небольшую паузу для макрозадач (setTimeout/setImmediate)
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(executionOrder[0]).toBe('nextTick');
    expect(executionOrder[1]).toBe('Promise');
    expect(executionOrder).toContain('setTimeout');
    expect(executionOrder).toContain('setImmediate');
  });
});



