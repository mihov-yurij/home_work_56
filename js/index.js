/**

 * @param {Function} callback 
 */
export const asyncOperationDemo = (callback) => {
  try {
    if (typeof callback !== 'function') {
      throw new Error('Callback должен быть функцией');
    }

    console.log("Перший виклик");

    // 1. process.nextTick
    process.nextTick(() => {
      try {
        const op = "nextTick";
        console.log("Виконано nextTick");
        callback(op);
        console.log(`Завершено виконання: ${op}`);
      } catch (err) {
        console.error("Помилка в nextTick:", err.message);
      }
    });

    // 2. setTimeout
    setTimeout(() => {
      try {
        const op = "setTimeout";
        console.log("Виконано setTimeout");
        callback(op);
        console.log(`Завершено виконання: ${op}`);
      } catch (err) {
        console.error("Помилка в setTimeout:", err.message);
      }
    }, 0);

    // 3. setImmediate
    setImmediate(() => {
      try {
        const op = "setImmediate";
        console.log("Виконано setImmediate");
        callback(op);
        console.log(`Завершено виконання: ${op}`);
      } catch (err) {
        console.error("Помилка в setImmediate:", err.message);
      }
    });

    console.log("Останній виклик");
  } catch (error) {
    console.error("Помилка:", error.message);
  }
};


