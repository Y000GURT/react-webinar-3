export default {

    load: id => {
      return async (dispatch, getState, services) => {
        dispatch({ type: 'comments/load-start' });
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
          });

          dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
        } 
        catch (e) {
          dispatch({ type: 'comments/load-error' });
        }
      };
    },
    send: comment => {
      return async (dispatch, getState, services) => {
        dispatch({ type: 'comments/send-start' });
        
        try {
          const res = await services.api.request({
            url: '/api/v1/comments',
            method: 'POST',
            body: JSON.stringify(comment),
          })

          dispatch({ type: 'comments/send-success', payload: { data: res.data.result } });
        }
        catch (e) {
          dispatch({ type: 'comments/send-error' });
        }
      }
    },

    setIdActiveAnswer: id => {
      return {
        type: 'comments/setIdActiveAnswer',
        payload: { id },
      };
    },
  };
  