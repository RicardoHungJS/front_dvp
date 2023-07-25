import { FallbackProps } from "react-error-boundary";

export const ErrorComponent: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className='w-screem h-[50rem] flex flex-wrap content-center items-center justify-center bg-teal-950 gap-10 text-center rounded shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
      <h1 className='text-5xl text-white w-full font-bold'>Algo salió mal...</h1>
      <p className='w-full text-white'><span className='font-bold'>ERROR: </span>{error.message}</p>
      <button className='h-12 w-64 rounded text-lg bg-slate-200 text-zinc-800 font-bold flex items-center justify-center hover:scale-110 transition-all' onClick={resetErrorBoundary}>RECARGAR PÁGINA</button>
    </div>
  )
}