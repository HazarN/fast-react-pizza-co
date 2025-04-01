import { useAppSelector } from '@utils/reduxStore';
import CreateUser from '@features/user/CreateUser';
import Button from './Buttons/Button';

function Home() {
  const username = useAppSelector((state) => state.user.username);

  return (
    <div className='my-10 text-center sm:my-16'>
      <h1 className='text-xl sm:text-2xl md:text-4xl font-semibold mb-8'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>Straight out of the oven, straight to you.</span>
      </h1>

      {username ? (
        <Button type='primary' to='/menu'>
          Continue ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
