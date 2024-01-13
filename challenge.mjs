// challenge.mjs

let queues = {};

async function waitForData(key, timeout) {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(null);
      removeQueue(key, timeoutId);
    }, timeout);
   

    if (queues[key]) {
      queues[key].push(resolve);
    } else {
      queues[key] = [resolve];
    }
  });
}

function removeQueue(key, timeoutId) {

  if (queues[key]) {
    queues[key] = queues[key].filter((resolve) => resolve !== timeoutId);
      if (queues[key].length === 0) {
        delete queues[key];
      }
  }
}

export async function blockingGet(key) {
  const data = await waitForData(key, 30000);
  return data;
}

export async function push(key, data) {

  if (queues[key]) {

    const resolve = queues[key].shift();
    console.log({resolve})
    if (resolve) {
      clearTimeout(resolve);
      resolve(data);
    }
  }
}
