export interface UiStateInterface {
  isPageLoading: boolean;
  isScoreDialog: boolean;
}

function state(): UiStateInterface {
  return {
    isPageLoading: false,
    isScoreDialog: false,
  };
}

export default state;
