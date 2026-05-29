export const initialStore=()=>{
  return{
    auth: localStorage.getItem('token') ? true : false,
    user: null,
    name: null,
    error: null,
    loading: false,
    userLoading: localStorage.getItem('token') ? true : false,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'auth':
      return {
        ...store, 
        auth:true, 
        user:action.payload.user,
        name:action.payload.user?.username || action.payload.user?.name || null,
        userLoading: false
      }

    case 'logout':
      return{
        ...store,
        auth:false, 
        user:null,
        name:null,
        token:null,
        userLoading: false
      }
    
    case 'setError':
      return{
        ...store,
        error:action.payload
      }

    case 'setLoading':
      return{
        ...store,
        loading:action.payload
      } 
    case 'setUserLoading':
      return{
        ...store,
        userLoading:action.payload
      } 
     
   
    default:
      throw Error('Unknown action.');
  }    
}
