import { asyncOperationDemo } from './index.js';
import { jest } from '@jest/globals';

describe('asyncOperationDemo: Перевірка черговості Event Loop', () => {
  test('має виконувати асинхронні операції у строгому порядку: nextTick -> таймери', (done) => {
    const executionOrder = [];
    
    // Функція, яка фіксує порядок викликів
    const trackingCallback = (op) => {
      executionOrder.push(op);

      // Очікуємо на завершення всіх 3-х асинхронних операцій
      if (executionOrder.length === 3) {
        try {
          // 1. nextTick завжди має бути першим серед асинхронних подій
          expect(executionOrder[0]).toBe('nextTick');
          
          // 2. Перевіряємо наявність інших операцій (порядок setTimeout/setImmediate 
          // у Node.js може залежати від середовища, але nextTick завжди перший)
          expect(executionOrder).toContain('setTimeout');
          expect(executionOrder).toContain('setImmediate');
          
          done(); // Тест пройдено
        } catch (error) {
          done(error); // Тест провалено
        }
      }
    };

    asyncOperationDemo(trackingCallback);
  });
});


