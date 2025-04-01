import IGeolocation from '@models/IGeolocation';

export async function getAddress(position: IGeolocation) {
  const { latitude, longitude } = position;

  const res = await fetch(
    `${import.meta.env.VITE_GEOCODING_API_URL}?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();

  console.log('Address data:', data);

  return data;
}
