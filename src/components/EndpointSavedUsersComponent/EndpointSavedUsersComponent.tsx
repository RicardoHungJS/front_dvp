function EndpointSavedUsersComponent({ savedUsers }: any) {
  return (
    <div className='scrollStyled pb-10 col-span-2 col-start-3 row-start-3 w-full h-full overflow-auto flex flex-wrap justify-center content-start gap-4'>
      <h1 className="w-full my-6 text-3xl text-center">Perfiles guardados:</h1>
      {savedUsers.length > 0 ?
        (savedUsers.map((user: any) => {
          return (<div className='w-4/5 h-24 bg-slate-300 grid grid-cols-savedProfiles justify-items-center items-center place-content-center py-2 rounded' key={user.id}>
            <img className='aspect-square w-20 rounded-full object-center' src={user?.avatar_url || ''} alt='imagen de usuario' />
            <p className="font-semibold text-center">{user?.login}</p>
            <a className="font-semibold text-center hover:text-cyan-700" href={user?.html_url} target="_blank">{user?.html_url}</a>
          </div>)
        }))
        :
        (<p className="font-bold text-2xl">No hay usuarios ahora mismo 🤷‍♂️</p>)
      }
    </div>
  )
}

export default EndpointSavedUsersComponent