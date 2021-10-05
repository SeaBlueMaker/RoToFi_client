const CHANGE_SITUATION = "plots/CHANGE_SITUATION";
const CHANGE_LOCATION = "plots/CHANGE_LOCATION";
const INSERT_CONVERSATION = "plots/INSERT_CONVERSATION";

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

const initialState = {
  isTimeFlag: true,
  situation: "",
  location: {},
  conversations: [],
};

export const plot = (state = initialState, action) => {
  switch (action.type) {
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
