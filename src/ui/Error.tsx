import { useRouteError } from 'react-router-dom';

import LinkButton from '@app/ui/Buttons/LinkButton';

function Error() {
  const error = useRouteError() as { data?: string; message?: string };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='w-10/12 h-1/5 bg-stone-200 rounded-md py-6 px-8 flex flex-col justify-between'>
        <div>
          <h1 className='text-xl text-center font-semibold mb-2'>Something went wrong 😢</h1>
          <p>{error.data || error.message}</p>
        </div>

        <div className='flex flex-1'>
          <LinkButton to={'-1'}>&larr; Go back</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Error;
