import { Comment } from '../types/Comment';

type SetCommentsAction = { type: 'comments/SET', payload: Comment[] };

const setComments = (products: Comment[]): SetCommentsAction => ({
  type: 'comments/SET',
  payload: products,
});

export const commentsActions = { setComments };

type Action = SetCommentsAction;

const commentsReducer = (
  state: Comment[] = [],
  action: Action,
): Comment[] => {
  switch (action.type) {
    case 'comments/SET':
      return action.payload;
    default:
      return state;
  }
};

export default commentsReducer;