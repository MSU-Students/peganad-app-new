export interface UiStateInterface {
  isPageLoading: boolean;
}

function state(): UiStateInterface {
  return {
    isPageLoading: false
  };
}

export default state;
