const INSERT_CHARACTER = "plots/INSERT_CHARACTER";

export const insertCharacter = (data) => ({
  type: INSERT_CHARACTER,
  character: data,
});

const initialState = {
  characters: [
    {
      _id: "",
      name: "",
      role: "",
      sex: "",
      age: "",
      nationality: "",
      appearance: "",
      personality: "",
      etc: "",
      imageURL: "",
    }
  ],
};

export const characters = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_CHARACTER:
      return {
        ...state,
        characters: state.characters.concat(action.character),
      };
    default:
      return state;
  }
};
