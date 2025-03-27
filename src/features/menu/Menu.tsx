import IPizza from '@interfaces/IPizza';
import { getMenu } from '@services/apiRestaurant';
import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';

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

// React Router loader function
export const loader = async () => await getMenu();

export default Menu;
