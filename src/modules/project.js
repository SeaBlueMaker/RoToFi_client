const CHANGE_TITLE = "project/CHANGE_TITLE";
const CHANGE_DESCRIPTION = "project/CHANGE_DESCRIPTION";
const LOAD_PROJECT = "project/LOAD_PROJECT";

export const changeTitle = (data) => ({
  type: CHANGE_TITLE,
  title: data,
});

export const changeDescription = (data) => ({
  type: CHANGE_DESCRIPTION,
  description: data,
});

export const loadProject = (data) => ({
  type: LOAD_PROJECT,
  title: data.title,
  description: data.description,
  _id: data._id,
});

const initialState = {
  title: "",
  description: "",
  _id: "",
};

export const project = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case CHANGE_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };
    case LOAD_PROJECT:
      return {
        title: action.title,
        description: action.description,
        _id: action._id,
      };
    default:
      return state;
  }
};
