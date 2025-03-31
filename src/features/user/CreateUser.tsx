import { useState } from 'react';

import Button from '@app/ui/Buttons/Button';
import { useAppDispatch } from '@app/utils/reduxStore';
import { useNavigate } from 'react-router-dom';
import { updateUsername } from './userSlice';

function CreateUser() {
  // Local state to get the user input
  const [username, setUsername] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!username) return;

    dispatch(updateUsername(username));

    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 sm:text-base md:text-lg'>
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input text-sm sm:text-lg w-72 mb-8'
      />

      {username !== '' && (
        <div>
          <Button type='primary'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
