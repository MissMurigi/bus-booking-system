import busReducer, { fetchDriverBuses } from '../busSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('busSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({ reducer: { bus: busReducer } });
    });

    it('should fetch driver buses successfully', async () => {
        const mockBuses = [
            { id: 1, busName: 'Bus A', route: 'Route 1', capacity: 40 },
            { id: 2, busName: 'Bus B', route: 'Route 2', capacity: 50 },
        ];

        mock.onGet('https://backend-pi-bay-65.vercel.app/buses/driver/123').reply(200, mockBuses);

        await store.dispatch(fetchDriverBuses('123'));
        const state = store.getState().bus;

        expect(state.driverBuses).toEqual(mockBuses);
    });
});
