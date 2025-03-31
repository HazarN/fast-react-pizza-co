import { useAppSelector } from '@utils/reduxStore';

function Username() {
  const username = useAppSelector((state) => state.user.username);

  if (!username) return null;

  return <div className='hidden md:block text-sm'>{username}</div>;
}

export default Username;
