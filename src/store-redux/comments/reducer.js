export const initialState = {
    data: [],
    count: 0,
    waiting: false, 
    formCommentIsActive: true,
    formAnswerIsActive: false, 
    index: null,
    currentCommentId: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
      case 'comments/load-start':
        return { ...state, data: [], count: 0, waiting: true };
  
      case 'comments/load-success':
        return { ...state, data: action.payload.data.items, count: action.payload.data.count, waiting: false };
  
      case 'comments/load-error':
        return { ...state, data: [], count: 0, waiting: false }; 
      
      case 'comments/send-start':
        return {...state, waiting: true};
        
      case 'comments/send-success': 
      return {...state, data: [...state.data, action.payload.temp], idActiveAnswer: null, waiting: false};
      
      case 'comments/send-error':
        return {...state, waiting: false};

      case 'comments/setFormAnswerIsActive':
        return {
          ...state, 
          formAnswerIsActive: action.payload.formAnswerIsActive, 
          formCommentIsActive: action.payload.formCommentIsActive, 
          currentCommentId: action.payload.id
        };

      case 'comments/setFormCommentIsActive':
        return {...state, formCommentIsActive: action.payload.formCommentIsActive, formAnswerIsActive: action.payload.formAnswerIsActive};
      
      case 'comments/addForm':
        return {...state, index: action.payload.res}
        
      default:
        // Нет изменений
        return state;
    }
}
  
export default reducer;