const CHANGE_SITUATION = "plots/CHANGE_SITUATION";
const CHANGE_LOCATION = "plots/CHANGE_LOCATION";
const INSERT_DIALOGUE = "plots/INSERT_DIALOGUE";
const INSERT_PLOT = "plots/INSERT_PLOT";
const CLEAR_PLOTS = "plots/CLEAR_PLOTS";
const CHANGE_PLOTS = "plots/CHANGE_PLOTS";

export const changeSituation = (data, plotId) => ({
  type: CHANGE_SITUATION,
  situation: data,
  plotId,
});

export const changeLocation = (data, plotId) => ({
  type: CHANGE_LOCATION,
  location: data,
  plotId,
});

export const insertDialogue = (data, plotId) => ({
  type: INSERT_DIALOGUE,
  dialogue: data,
  plotId,
});

export const insertPlot = (data) => ({
  type: INSERT_PLOT,
  plot: data,
});

export const clearPlots = () => ({
  type: CLEAR_PLOTS,
});

export const changePlots = (data) => ({
  type: CHANGE_PLOTS,
  plots: data,
});

const initialState = {
  plots: [],
};

export const plots = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_PLOTS:
      return {
        plots: initialState.plots,
      };
    case INSERT_PLOT:
      return {
        ...state,
        plots: state.plots.concat(action.plot),
      };
    case CHANGE_SITUATION:
      return {
        ...state,
        plots: state.plots.map((plot) => {
          if (plot._id !== action.plotId) {
            return plot;
          }

          return {
            ...plot,
            situation: action.situation,
          };
        }),
      };
    case CHANGE_LOCATION:
      return {
        ...state,
        plots: state.plots.map((plot) => {
          if (plot._id !== action.plotId) {
            return plot;
          }

          return {
            ...plot,
            location: {
              title: action.location.title || plot.location.title,
              imageURL: action.location.imageURL || plot.location.imageURL,
              description: action.location.description || plot.location.description,
            },
          };
        }),
      };
    case INSERT_DIALOGUE:
      return {
        ...state,
        plots: state.plots.map((plot) => {
          if (plot._id !== action.plotId) {
            return plot;
          }

          return {
            ...plot,
            dialogues: action.dialogue,
          };
        }),
      };
    case CHANGE_PLOTS:
      return {
        ...state,
        plots: action.plots,
      };
    default:
      return state;
  }
};
