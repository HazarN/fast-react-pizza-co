import { useLoaderData } from 'react-router-dom';

import { getMenu } from '@services/apiRestaurant';

import IPizza from '@models/IPizza';

import MenuItem from '@features/menu/MenuItem';

function Menu() {
  const menu = useLoaderData() as Array<IPizza>;

  return (
    <ul className='divide-y divide-stone-200 sm:px-4'>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export const loader = async () => await getMenu();

export default Menu;
