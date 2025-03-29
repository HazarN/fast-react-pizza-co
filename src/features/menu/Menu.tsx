import { useLoaderData } from 'react-router-dom';

import MenuItem from '@features/menu/MenuItem';
import IPizza from '@interfaces/IPizza';
import { getMenu } from '@services/apiRestaurant';

function Menu() {
  const menu = useLoaderData() as Array<IPizza>;

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export const loader = async () => await getMenu();

export default Menu;
