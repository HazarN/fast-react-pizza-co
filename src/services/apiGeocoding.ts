import IGeolocation from '@interfaces/IGeolocation';

export async function getAddress({ latitude, longitude }: IGeolocation) {
  const res = await fetch(
    `${import.meta.env.VITE_GEOCODING_API_URL}?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  return data;
}
