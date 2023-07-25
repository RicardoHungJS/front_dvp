import { useNavigate } from 'react-router-dom';

function UserCardComponent({ user }: any) {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/user_card/${user.login}`)
  }

  return (
    <div className='h-32 w-[90%] my-4 px-8 flex items-center justify-between rounded transition duration-300 
    bg-gradient-to-r from-black to-sky-500 hover:from-black hover:to-indigo-800 cursor-pointer'
      onClick={() => redirect()}>
      <img className='h-4/5 rounded-full mx-3' src={user.avatar_url} alt="" />
      <p className='mx-3 text-[1.3rem] font-bold text-white'>{user.login}</p>
      <p className='mx-3 text-[1.3rem] font-bold text-white'>{user.id}</p>
    </div>
  )
}

export default UserCardComponent