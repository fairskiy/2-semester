export function asyncMapCallback(array, asyncMapper, onComplete) {
  if (!array.length) return onComplete(null, []);
  
  const result = [];
  let completed = 0, hasError = false;

  array.forEach((item, i) => {
    asyncMapper(item, (err, mappedValue) => {
      if (hasError) return;
      if (err) return (hasError = true, onComplete(err, null));

      result[i] = mappedValue;
      if (++completed === array.length) onComplete(null, result);
    });
  });
}

export function asyncMapPromise(array, asyncMapper) {
  return new Promise((resolve, reject) => 
    asyncMapCallback(array, asyncMapper, (err, res) => err ? reject(err) : resolve(res))
  );
}

export function asyncMapAbortable(array, asyncMapper, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new Error('Operation aborted'));

    const onAbort = () => reject(new Error("Operation aborted"));
    signal?.addEventListener("abort", onAbort);

    asyncMapCallback(array, asyncMapper, (err, res) => {
      signal?.removeEventListener("abort", onAbort);
      if (signal?.aborted) return;
      
      err ? reject(err) : resolve(res);
    });
  });
}