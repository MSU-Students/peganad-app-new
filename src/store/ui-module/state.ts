export interface UiStateInterface {
  isPageLoading: boolean;
  progress: number;
  docSize: number;
}

function state(): UiStateInterface {
  return {
    isPageLoading: false,
    progress: 0,
    docSize: 0
  };
}

export default state;
