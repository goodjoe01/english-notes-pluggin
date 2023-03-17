import axios from 'axios'
import { Collection } from './collection.types';

const BASE_URL = 'https://english-vocabulary-api-production-5fb2.up.railway.app/api/collections'

const getStoredData = async () => {
  const res = await chrome.storage.sync.get('EWToken');
  const data = res['EWToken'] ? JSON.parse(res['EWToken']) : '';

  return data;
}

export const fetchCollections = async (token: string) => {

  const res = await axios.get<Collection[]>(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
}

export const post = async (collection: Collection, token: string) => {
  const res = await axios.post<Collection>(BASE_URL, collection,  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('POST RESPONSE: ', res.data);
  return res.data;
}

export const _delete = async (id: string, token: string) => {
  const res = await axios.delete<Collection>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );
  return res.data;
}

export const put = async ({id, name}: Collection, token: string) => {
  const res = await axios.patch<Collection>(`${BASE_URL}/${id}`, {
    name 
  } ,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );
  return res.data;
}
