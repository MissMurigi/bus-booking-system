import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DriverDashboard from '../DriverDashboard';

const mockStore = configureStore([]);

describe('DriverDashboard', () => {
    it('renders assigned buses', () => {
        const initialState = {
            bus: {
                driverBuses: [
                    { id: 1, busName: 'Bus A', route: 'Route 1', capacity: 40 },
                    { id: 2, busName: 'Bus B', route: 'Route 2', capacity: 50 },
                ],
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <DriverDashboard />
            </Provider>
        );

        expect(screen.getByText(/Bus A/)).toBeInTheDocument();
        expect(screen.getByText(/Route 1/)).toBeInTheDocument();
        expect(screen.getByText(/Capacity: 40/)).toBeInTheDocument();
    });
});
