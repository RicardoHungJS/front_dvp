import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { formatDate } from '../../helpers/formatDate';
import { useErrorBoundary } from 'react-error-boundary';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const useExportData = (fetchUrl: string, fetchBody: any) => {
  const { showBoundary } = useErrorBoundary();
  const postData = async () => {
    try {
      const response = await fetch(fetchUrl, {
        method: 'POST',
        body: JSON.stringify(fetchBody),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      showBoundary(error);
    }
  };

  return postData;
};

const UserSelectedCardComponent = () => {
  const { showBoundary } = useErrorBoundary();
  const { user_login } = useParams();
  const data: any = useFetch(`https://api.github.com/users/${user_login}`);

  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/`)
  }

  const fetchBodyToExport = {
    "id": data?.id,
    "loginName": data?.login,
    "avatarUrl": data?.avatar_url,
    "profileUrl": data?.html_url
  }

  const postDataRequest = useExportData('http://localhost:4000/users', fetchBodyToExport);

  const handleExportClick = async () => {
    try {
      const response = await postDataRequest();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: response.message,
        text: `Status code: ${response.status}`,
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='h-[4rem] aspect-square bg-gray-600 absolute top-3 left-3 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 hover:bg-gray-500 transition-all' onClick={() => redirect()}>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" style={{ color: "#ffffff", }} />
      </div>
      {data ? (
        <div className="w-3/5 h-3/5 min-w-[60rem] grid grid-cols-2 items-center justify-center place-items-center rounded bg-gradient-to-r from-black to-sky-500
        shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
          <img className="w-3/4 rounded-full shadow-[0px_5px_23px_0px_#00000024]" src={data.avatar_url} alt="user avatar" />
          <div className='grid gap-8'>
            <h1 className='w-full text-white text-5xl font-bold'>{data?.name}</h1>
            <p className='w-full text-white text-2xl font-semibold'>Número de seguidores: {data?.followers}</p>
            <p className='w-full text-white text-2xl font-semibold'>Id del usuario: {data?.id}</p>
            <span className='w-full text-white text-2xl font-semibold'>Gitub page:  <a className='border-b-indigo-800 border-b-0 hover:text-indigo-800 hover:border-b-2 hover:border-b-indigo-800 transition-all'
              href={data?.html_url} target="_blank">{data?.html_url}</a></span>
            <p className='w-full text-white text-2xl font-semibold'>creado el día: {formatDate(data?.created_at)}</p>
            <button
              className='bg-slate-500 w-52 h-10 text-white font-semibold rounded justify-self-start shadow-[0px_5px_23px_0px_#00000024] ]
              hover:shadow-[0px_21px_23px_0px_#00000024] hover:bg-slate-400 transition duration-300' onClick={handleExportClick}>
              EXPORTAR
            </button>
          </div>
        </div>
      ) : (
        <div className='w-3/5 h-3/5 bg-slate-500 flex justify-center items-center font-bold text-5xl text-white rounded'>Cargando información...</div>
      )
      }
    </div>
  )
}

export default UserSelectedCardComponent