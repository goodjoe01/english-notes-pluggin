import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {v4} from 'uuid'
import { getUser, login } from '../services/user.service'
import SignInForm from './SignInForm'
import WordsList from './WordsList'
import { fetchCollections } from '../services/collection.service'
import { Collection } from '../services/collection.types'
import { verifyExpirationDate } from '../services/utils' 

export const App = () => {

  const [token, setToken] = useState(null);
  const [wordsCollection, setWordsCollection] = useState<Collection[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);

      const res = await chrome.storage.sync.get('EWToken');

      const data = res['EWToken'] ? JSON.parse(res['EWToken']) : null;
      console.log(data);
      if(data){
        const expire = await verifyExpirationDate(data.token)
        console.log(expire)
        const wordsData = await fetchCollections(data.token);
        setToken(data.token);
        setName(data.firstName);
        setWordsCollection(wordsData);
      }
      setLoading(false);
    }
    fetchData();
  },[token])


  return (
    <div className='bookmarks-app font-ubuntu w-[300px] text-base bg-gray-700 text-white'>
      { 
      loading ? <p>Loading...</p> : token ?
      <WordsList 
      userName={name} 
      words={wordsCollection}
      token={token}
      setToken={setToken}
      setCollection={setWordsCollection}
      /> 
      : 
      <SignInForm setToken={setToken} /> 
      }
    </div>
  )
}
