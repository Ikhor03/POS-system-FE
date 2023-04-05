import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/cartItem";
import { setCart } from "../app/features/Cart/action";

const Cart = () => {
    const carts = useSelector((state) => state.carts.cart)
    const dispatch = useDispatch()

    let dataCartLocal = JSON.parse(localStorage.getItem('ADD_TO_CART'))
    useEffect(() => {
        if (dataCartLocal) {
            dispatch(setCart(dataCartLocal))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('ADD_TO_CART', JSON.stringify(carts))
    }, [carts])

    const total = carts.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return (
        <div className="flex flex-col items-center py-8">
            <h2 className=" text-4xl font-bold mb-4">Shopping Cart</h2>
            {carts.length === 0 ? (
                <div className="mt-5">
                    <p>Your cart is empty.</p>
                    <br />
                    <a href="home" className="font-medium text-amber-600 hover:text-amber-500">Order Sekarang &rarr;</a>
                </div>
            ) : (
                <div className="flex border-t w-3/4 md:w-full max-w-xl h-full flex-col bg-white shadow-xl">
                    {carts.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                        {/* <CartItem /> */}
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6 bg-white">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>Rp. {total}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <a
                                href="/"
                                className="flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                            >
                                Checkout
                            </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p className="mr-2">or</p>
                            <a
                                href="home"
                                className="font-medium text-amber-600 hover:text-amber-500"
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default Cart;
