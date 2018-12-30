import * as ActionTypes from './ActionTypes';

export const addComment = (rating, author, comment) =>({

    type: ActionTypes.ADD_COMMENT,
    payload:{
        rating: rating,
        author: author,
        comment: comment
    }
});