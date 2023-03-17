import React , {useRef, useState} from 'react'
import { Collection } from '../services/collection.types'
import { _delete, put } from '../services/collection.service'
import {MdCancel} from 'react-icons/md'
import {AiOutlineEdit} from 'react-icons/ai'
import { useOnClickOutside } from '../hooks/hooks'

interface WordItemProps {
  word: Collection
  token: string
  handleDelete: (id: string, token: string) => void
  setCollection: React.Dispatch<Collection[]>
  collection: Collection[]
}

const WordItem = ({word, token, handleDelete, setCollection, collection}: WordItemProps) => {
  const [editInput, setEditInput] = useState(false); 
  const [inputWord, setInputWord] = useState(word.name);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setEditInput(false));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedWord = await put({id: word.id, name: inputWord}, token)
    console.log('edited word: ', editedWord);

    setCollection(collection.map(word => {
      if(word.id === editedWord.id) return editedWord
      return word;
    }));
    setEditInput(false);
  }

  const handleClick = () => {
    setEditInput(!editInput)
    setInputWord(word.name)
  }

  return (
    <div id='wordItem' ref={ref} className='hover:wordItemHover text-gray-600 flex-auto p-2 mr-2 bg-white border border-gray-200 rounded-sm'>
      <div className='flex justify-between gap-2'>
        <div className='flex gap-2'>
          <div id='edit' className=' flex items-center'>
            <AiOutlineEdit 
            onClick={handleClick}
            title='edit' 
            className='text-yellow-500 text-lg cursor-pointer'
            />
          </div>
          <div id='data' className=''>
            {
              editInput?             
              <form onSubmit={handleSubmit}>
                <input 
                className='border border-gray-300 outline-none w-full py-1 px-2 text-sm rounded-sm' 
                type="text" 
                name="name" 
                id="wordId" 
                value={inputWord}
                onChange={handleChange} />
              </form> : 
              <p className='text-sm'> {word.name} </p>
            }
          </div>
        </div>
        <div id='delete' className='flex justify-end items-center'>
          <MdCancel 
          onClick={()=>handleDelete(word.id, token)}
          title='delete' className='text-deleteBtn text-lg cursor-pointer' ></MdCancel>
        </div>
      </div>
    </div>
  )
}

export default WordItem
