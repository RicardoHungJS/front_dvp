import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

type ChildProps = {
  onSubmitSearch: (newData: FieldValues) => void;
};

const SearchComponent: React.FC<ChildProps> = ({ onSubmitSearch }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: FieldValues) => {
    onSubmitSearch(data)
  }

  const validateWord = (value: string) => {
    if (value.toLowerCase().includes('doublevpartners')) {
      return false;
    }
    return true;
  };

  return (
    <div className='w-full h-24 col-span-4 bg-gradient-to-r from-black to-sky-500'>
      <form className='w-full h-full pt-6 flex flex-wrap content-start items-start justify-center' onSubmit={handleSubmit(onSubmit)}>
        <input className='w-64 h-10 p-3 rounded-l outline-none' type="text" placeholder='Buscar usuario'
          {...register('search', {
            required: true,
            minLength: 4,
            validate: validateWord
          })} />
        <div className='w-16 h-10 flex justify-center items-center relative z-10 bg-indigo-800 hover:bg-indigo-600 transition-all rounded-r'>
          <input type='submit' value='' className='w-16 h-10 absolute z-30 text-white font-bold rounded-r cursor-pointer'></input>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#ffffff", position: "absolute", zIndex: "20" }} />
        </div>
        {errors.search?.type === 'required' && <span className='w-full h-7 text-center text-red-500 text-sm flex items-center justify-center'>El campo es requerido</span>}
        {errors.search?.type === 'minLength' && <span className='w-full h-7 text-center text-red-500 text-sm flex items-center justify-center'>El campo debe tener mínimo 4 caracteres</span>}
        {errors.search?.type === 'validate' && <span className='w-full h-7 text-center text-red-500 text-sm flex items-center justify-center'>No se permite la palabra "doublevpartners"</span>}
      </form>
    </div>
  )
}

export default SearchComponent