export const asyncOperationDemo = async (callback) => {
  try {
    if (typeof callback !== 'function') throw new Error('Callback must be a function');

    console.log("Перший виклик");

    // Используем промис, чтобы подождать выполнения nextTick
    await new Promise((resolve) => {
      process.nextTick(() => {
        const op = "nextTick";
        console.log("Виконано nextTick");
        callback(op);
        console.log(`Завершено виконання: ${op}`);
        resolve();
      });
    });

    // После завершения nextTick выполняем Promise
    const opPromise = "Promise";
    console.log(`Виконано ${opPromise}`);
    callback(opPromise);
    console.log(`Завершено виконання: ${opPromise}`);

    // Макрозадачи отправляем в очередь
    setTimeout(() => {
      const op = "setTimeout";
      console.log("Виконано setTimeout");
      callback(op);
      console.log(`Завершено виконання: ${op}`);
    }, 0);

    setImmediate(() => {
      const op = "setImmediate";
      console.log("Виконано setImmediate");
      callback(op);
      console.log(`Завершено виконання: ${op}`);
    });

    console.log("Останній виклик");
  } catch (error) {
    console.error("Помилка:", error.message);
  }
};


