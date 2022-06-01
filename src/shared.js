export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
export const getCachedData = async (
  cacheName,
  url,
  method,
  headers,
  body,
  expirationTime = 86400
) => {
  const initTime = new Date().getTime();
  const req = new Request(url, {
    method: method,
    headers: headers,
    body: body,
  });
  const cache = await caches.open(cacheName);
  const cacheResponse = await cache.match(req);
  if (cacheResponse) {
    const data = await cacheResponse.json();
    const finalTime = new Date().getTime();
    console.log('TIME: ', finalTime - initTime, 'ms');
    return data;
  } else {
    const response = await fetch(req);
    cache.put(req, response.clone());
    const data = await response.json();
    const finalTime = new Date().getTime();
    console.log('TIME: ', finalTime - initTime, 'ms');
    return data;
  }
};
