import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments } from '../../redux/slices/paymentSlice';

const PaymentList = () => {
    const dispatch = useDispatch();
    const { payments, loading, error } = useSelector((state) => state.payment);

    useEffect(() => {
        dispatch(fetchPayments());
    }, [dispatch]);

    return (
        <div>
            <h2>Payment List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {payments.map((payment) => (
                    <li key={payment.payment_id}>
                        Booking ID: {payment.booking_id}, Amount: {payment.payment_amount}, Status: {payment.payment_status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentList;
