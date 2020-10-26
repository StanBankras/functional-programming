import fetch from 'node-fetch';

async function useData(uri) {
  const result = await fetch(uri);
  const data = await result.json();
  return data;
}

export default { useData };