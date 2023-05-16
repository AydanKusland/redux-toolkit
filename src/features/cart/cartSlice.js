import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'

const initialState = {
	cartItems: cartItems,
	amount: 4,
	total: 0,
	isLoading: true
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: state => {
			state.cartItems = []
		},
		removeItem: (state, { payload }) => {
			const itemId = payload
			state.cartItems = state.cartItems.filter(item => item.id !== itemId)
		},
		toggle: (state, action) => {
			const { type, id } = action.payload
			const item = state.cartItems.find(item => item.id === id)
			if (type === 'dec') item.amount--
			if (type === 'inc') item.amount++
		},
		calculateTotals: state => {
			const { amount, total } = state.cartItems.reduce(
				(acc, cur) => {
					acc.amount += cur.amount
					acc.total += cur.amount * cur.price
					return acc
				},
				{ amount: 0, total: 0 }
			)

			state.amount = amount
			state.total = total
		}
	}
})

export const { clearCart, removeItem, toggle, calculateTotals } =
	cartSlice.actions
export default cartSlice.reducer
