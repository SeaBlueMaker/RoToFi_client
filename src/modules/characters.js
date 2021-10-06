const INSERT_CHARACTER = "characters/INSERT_CHARACTER";
const UPDATE_CHARACTER = "characters/UPDATE_CHARACTER";
const CLEAR_CHARACTERS = "characters/CLEAR_CHARACTERS";

export const insertCharacter = (data) => ({
  type: INSERT_CHARACTER,
  character: data,
});

export const updateCharacter = (data) => ({
  type: UPDATE_CHARACTER,
  character: data,
});

export const clearCharacters = () => ({
  type: CLEAR_CHARACTERS,
});

const initialState = {
  characters: [],
};

export const characters = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_CHARACTER:
      return {
        ...state,
        characters: state.characters.concat(action.character),
      };
    case UPDATE_CHARACTER:
      return {
        ...state,
        characters: (
          state.characters.map((item) => {
            if (item._id !== action.character._id) {
              return item;
            }

            return {
              ...item,
              ...action.character,
            };
          })
        )
      };
    case CLEAR_CHARACTERS:
      return {
        characters: initialState.characters,
      };
    default:
      return state;
  }
};
