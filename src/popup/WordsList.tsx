import React, {useEffect, useState} from 'react'
import { fetchCollections, _delete } from '../services/collection.service'
import { Collection } from '../services/collection.types'
import WordItem from './WordItem'
import {CiLogout} from 'react-icons/ci'
import { post } from '../services/collection.service'

interface WordsListProps {
  userName: string
  words: Collection[]
  setCollection: React.Dispatch<Collection[]>
  setToken: React.Dispatch<string>
  token: string
}


const WordsList = ({userName, setToken, token, words, setCollection}: WordsListProps) => {

  const [word, setWord] = useState<Collection>({
    name: ''
  });

  const handleLogOut = () => {
    chrome.storage.sync.remove('EWToken');
    setToken(null);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWord({name: ''})
    const wordData = await post(word, token);
    console.log('post: ', wordData);
    setCollection([...words, { id: wordData.id, name: wordData.name } ])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord({...word, [e.target.name]: e.target.value})
  }

  const handleDelete = async (id: string, token: string) => {
    console.log('id: ', id)
    const deletedWord = await _delete(id, token)
    console.log('deleted: ', deletedWord)
    setCollection(words.filter(word => word.id !== deletedWord.id))
  }

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1>Welcome {userName} 😀</h1>
        <div className='bg-logoutBtn cursor-pointer gap-1 p-1 rounded-sm flex  justify-end'>
          <CiLogout title='Logout' className='text-xl' onClick={handleLogOut}></CiLogout>
        </div>
      </div>
      <div className='mt-2 flex gap-2 flex-col overflow-y-scroll max-h-[400px]'>
        {
          words.map((word, i) => (
            <WordItem 
            key={i} 
            word={word}
            token={token}
            handleDelete={handleDelete}
            setCollection={setCollection}
            collection={words}
            />
          ))
        }
      </div>
      <div className='mt-2'>
        <form className='h-full' onSubmit={handleSubmit}>
          <input className='text-gray-500 h-full p-2 w-full bg-white border border-gray-200 rounded-sm text-sm outline-none'
          name='name'
          type='text'
          placeholder='Add a new word...'
          onChange={handleChange}
          value={word.name}
          />
        </form>
      </div>
    </div>
  )
}

export default WordsList
