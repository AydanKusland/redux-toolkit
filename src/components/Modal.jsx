import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../features/modal/modalSlice'
import { clearCart } from '../features/cart/cartSlice'

const Modal = () => {
	const dispatch = useDispatch()
	return (
		<aside className='modal-container'>
			<div className='modal'>
				<h4>remove all items from your shopping cart?</h4>
				<div className='btn-container'>
					<button
						className='btn confirm-btn'
						onClick={() => {
							dispatch(toggleModal())
							dispatch(clearCart())
						}}
					>
						confirm
					</button>
					<button
						className='btn clear-btn'
						onClick={() => {
							dispatch(toggleModal())
						}}
					>
						cancel
					</button>
				</div>
			</div>
		</aside>
	)
}

export default Modal
