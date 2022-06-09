export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const newResponse = (res, headerFn) => {
  const cloneHeaders = () => {
    const headers = new Headers();
    for (let kv of res.headers.entries()) {
      headers.append(kv[0], kv[1]);
    }
    return headers;
  };

  const headers = headerFn ? headerFn(cloneHeaders()) : res.headers;

  return new Promise((resolve) => {
    return res.blob().then((blob) => {
      resolve(
        new Response(blob, {
          status: res.status,
          statusText: res.statusText,
          headers: headers,
        })
      );
    });
  });
};

export const getCachedData = async (
  cacheName,
  url,
  method,
  expirationTime = 86400, //seconds
  headers,
  body
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
    const expirationDate = new Date(cacheResponse.headers.get('Expires'));
    if (new Date() >= expirationDate) {
      const response = await fetch(req);
      const updatedResponse = await newResponse(response, (headers) => {
        headers.set(
          'Expires',
          new Date(new Date().getTime() + expirationTime * 1000)
        );
        return headers;
      });
      cache.put(req, updatedResponse.clone());
      const data = await updatedResponse.json();
      const finalTime = new Date().getTime();
      console.log('TIME FROM FETCH: ', finalTime - initTime, 'ms');
      return { data: data, from: 'SERVER' };
    }
    const data = await cacheResponse.json();
    const finalTime = new Date().getTime();
    console.log('TIME FROM CACHE: ', finalTime - initTime, 'ms');
    return { data: data, from: 'CACHE' };
  } else {
    const response = await fetch(req);
    const updatedResponse = await newResponse(response, (headers) => {
      headers.set(
        'Expires',
        new Date(new Date().getTime() + expirationTime * 1000)
      );
      return headers;
    });
    cache.put(req, updatedResponse.clone());
    const data = await updatedResponse.json();
    const finalTime = new Date().getTime();
    console.log('TIME FROM FETCH: ', finalTime - initTime, 'ms');
    return { data: data, from: 'SERVER' };
  }
};
