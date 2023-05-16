import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toggleModal } from '../modal/modalSlice'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
	cartItems: [],
	amount: 4,
	total: 0,
	isLoading: true
}

export const getCartItems = createAsyncThunk(
	'cart/getCartItems',
	async (_, thunkAPI) => {
		try {
			// console.log(thunkAPI)
			thunkAPI.dispatch(toggleModal())
			const { data } = await axios(url)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue('something went wrong')
		}
	}
)

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
	},
	extraReducers: builder => {
		builder
			.addCase(getCartItems.pending, state => {
				state.isLoading = true
			})
			.addCase(getCartItems.fulfilled, (state, action) => {
				state.isLoading = false
				state.cartItems = action.payload
			})
			.addCase(getCartItems.rejected, (state, action) => {
				console.log(action)
				state.isLoading = false
			})
	}
})

export const { clearCart, removeItem, toggle, calculateTotals } =
	cartSlice.actions
export default cartSlice.reducer
