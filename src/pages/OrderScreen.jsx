import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { usePaystackPayment } from '@paystack/inline-js';

const Loader = () => <div>Loading...</div>;

const ORDERS_URL = 'https://e-commerce-backend-7gua.onrender.com/api/orders';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const paystackReference = searchParams.get('reference');

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingPay, setLoadingPay] = useState(false);
    const [error, setError] = useState(null);

    const userInfo = {
        token: 'YOUR_JWT_TOKEN_HERE',
    };

    const verifyPayment = async (reference) => {
        try {
            setLoadingPay(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data: updatedOrder } = await axios.put(
                `${ORDERS_URL}/${orderId}/pay`,
                { id: reference },
                config
            );

            setOrder(updatedOrder);
            setLoadingPay(false);
            toast.success('Payment successful!');

            searchParams.delete('reference');
            setSearchParams(searchParams);

        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
            setLoadingPay(false);
        }
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`${ORDERS_URL}/${orderId}`, config);
                setOrder(data);
                setLoading(false);
                return data;
            } catch (err) {
                setError(err?.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchOrder().then((fetchedOrder) => {
            if (fetchedOrder && paystackReference && !fetchedOrder.isPaid) {
                verifyPayment(paystackReference);
            }
        });

    }, [orderId, paystackReference, userInfo.token]);

    const paystackConfig = {
        reference: new Date().getTime().toString(),
        email: order?.user?.email,
        amount: Math.round(order?.totalPrice * 100),
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    };

    const initializePayment = usePaystackPayment(paystackConfig);

    const onSuccess = (transaction) => {
        verifyPayment(transaction.reference);
    };

    const onClose = () => {
        toast.info('Payment was cancelled');
    };

    if (loading) return <Loader />;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
            <h1>Order {order._id}</h1>
            <p>Email: {order.user.email}</p>
            <p>Total: ${order.totalPrice}</p>

            {order.isPaid ? (
                <div style={{ color: 'green', border: '1px solid green', padding: '10px' }}>
                    Paid on {new Date(order.paidAt).toLocaleString()}
                </div>
            ) : (
                <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
                    Not Paid
                </div>
            )}

            {loadingPay && <Loader />}

            {!order.isPaid && !loadingPay && (
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={() => {
                            initializePayment(onSuccess, onClose);
                        }}
                        style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
                    >
                        Pay with Paystack
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderScreen;