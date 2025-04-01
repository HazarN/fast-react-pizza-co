import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getAddress } from '@services/apiGeocoding';

import IGeolocation from '@models/IGeolocation';

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk<
  { position: IGeolocation | null; address: string },
  void
>('user/fetchAddress', async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  } as IGeolocation;

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.countryName}`;

  return { position, address };
});

export type UserState = {
  username: string;
  status: string;
  address: string;
  position: IGeolocation | null;
  error: string | null;
};

const initialState: UserState = {
  username: '',
  status: 'idle',
  address: '',
  position: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state: UserState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchAddress.fulfilled,
        (state, action: PayloadAction<{ position: IGeolocation | null; address: string }>) => {
          state.status = 'idle';
          state.position = action.payload.position;
          state.address = action.payload.address;
        }
      )
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error?.message as string;
        state.position = null;
        state.address = '';
      });
  },
});

export const { updateUsername } = userSlice.actions;
export default userSlice.reducer;
