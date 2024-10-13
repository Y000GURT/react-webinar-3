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

    send: (comment, name) => {
      return async (dispatch, getState, services) => {
        dispatch({ type: 'comments/send-start' });
        
        try {
          const res = await services.api.request({
            url: '/api/v1/comments',
            method: 'POST',
            body: JSON.stringify(comment),
          })
          const temp = {
            ...res.data.result,
            author: {profile: {name: name}},
          }
          console.log(temp)
          dispatch({ type: 'comments/send-success', payload: { temp } });
          dispatch({ type: 'comments/setFormCommentIsActive', payload: { formCommentIsActive: true, formAnswerIsActive: false } });
        }
        catch (e) {
          dispatch({ type: 'comments/send-error' });
        }
      }
    },

    addForm: (id, level, comments) => {
      return (dispatch) => {
        const parentIndex = comments.findIndex(item => item.value === id);
        let lastChildIndex
        let res
        for (let i = parentIndex + 1; i < comments.length; i++) {
          if (comments[i].level <= level) {
            break
          }
          if (comments[i].level === level + 1) {
            lastChildIndex = i
          }
        }

        if (lastChildIndex) {
          res = lastChildIndex
        }
        else {
          res = parentIndex
        }
        dispatch({ type: 'comments/addForm', payload: { res: res } });
      }
    },

    setFormAnswerIsActive: (id) => {
      return {
        type: 'comments/setFormAnswerIsActive',
        payload: {formAnswerIsActive: true, formCommentIsActive: false, id: id},
      }
    },

    setFormCommentIsActive: () => {
      return {
        type: 'comments/setFormCommentIsActive',
        payload: {formAnswerIsActive: false, formCommentIsActive: true},
      }
    },
  };
  