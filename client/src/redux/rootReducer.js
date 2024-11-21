const initialState ={
    loading:false,
    cartItem:[],
    user: null,
}
export const rootReducer=(state=initialState,action)=>{
    switch(action.type){
        
        case 'addToCart': return{
            ...state,
            cartItem:[...state.cartItem,action.payload]
        }
        case 'updateCart': return{
            ...state,
            cartItem:state.cartItem.map((item)=> 
                item._id===action.payload._id
            ?{...item, quantity:action.payload.quantity}:
            item)

        }
        case 'deleteItem': return{
            ...state,
            cartItem:state.cartItem.filter((item)=>item._id!==action.payload._id)
        }
case 'showLoading': return{
    ...state,
    loading:true
}
case 'hideLoading': return{
    ...state,
    loading:false
}
case 'CLEAR_CART':
    return {
      ...state,
      cartItem: [], // Reset cart items
    };

  case 'CLEAR_USER':
    return {
      ...state,
      user: null, // Clear user data
    };
    case 'SET_USER':
        return {
            ...state,
            user: action.payload.user, // Set the logged-in user's data
            cartItem: action.payload.cart, // Set the user's cart items
        };
    
     
        default: return state


    }
}