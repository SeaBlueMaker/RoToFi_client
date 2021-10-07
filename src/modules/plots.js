const CHANGE_SITUATION = "plots/CHANGE_SITUATION";
const CHANGE_LOCATION = "plots/CHANGE_LOCATION";
const INSERT_CONVERSATION = "plots/INSERT_CONVERSATION";
const INSERT_PLOT = "plots/INSERT_PLOT";

export const changeSituation = (data) => ({
  type: CHANGE_SITUATION,
  situation: data,
});

export const changeLocation = (data) => ({
  type: CHANGE_LOCATION,
  location: data,
});

export const insertConversation = (data) => ({
  type: INSERT_CONVERSATION,
  conversation: data,
});

export const insertPlot = (data) => ({
  type: INSERT_PLOT,
  plot: data,
});

const initialState = {
  plots: [],
};

export const plots = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_PLOT:
      return {
        ...state,
        plots: state.plots.concat(action.plot),
      };
    case CHANGE_SITUATION:
      return {
        ...state,
        situation: action.situation,
      };
    case CHANGE_LOCATION:
      return {
        ...state,
        title: action.location.title,
        imageURL: action.location.imageURL,
        description: action.location.description,
      };
    case INSERT_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.concat(action.conversation),
      };
    default:
      return state;
  }
};
