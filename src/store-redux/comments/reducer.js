export const initialState = {
    data: [],
    count: 0,
    waiting: false, 
    idActiveAnswer: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
      case 'comments/load-start':
        return { ...state, data: [], count: 0, waiting: true };
  
      case 'comments/load-success':
        return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false };
  
      case 'comments/load-error':
        return { ...state, data: [], count: 0, waiting: false }; 
    
      case 'comments/setIdActiveAnswer':
        return { ...state, idActiveAnswer: action.payload.id };
      
      case 'comments/send-start':
        return {...state, waiting: true};
        
      case 'comments/send-success': 
      return {...state, data: [...state.data, action.payload.data], idActiveAnswer: null, waiting: false};
      
      case 'comments/send-error':
        return {...state, waiting: false};

      default:
        // Нет изменений
        return state;
    }
}
  
export default reducer;