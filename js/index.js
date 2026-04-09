function asyncOperationDemo(callback) {
  console.log("Перший виклик");

  queueMicrotask(() => {
    const op = "nextTick (microtask)";
    console.log("Виконано nextTick");
    callback(op);
  });

   setTimeout(() => {
    const op = "setTimeout";
    console.log("Виконано setTimeout");
    callback(op);
  }, 0);

  const setImmediatePolyfill = (cb) => setTimeout(cb, 0);

  setImmediatePolyfill(() => {
    const op = "setImmediate";
    console.log("Виконано setImmediate");
    callback(op);
  });

  console.log("Останній виклик");
}

export { asyncOperationDemo };
