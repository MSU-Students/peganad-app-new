export interface UiStateInterface {
  isPageLoading: boolean;
  hasNewContent: boolean;
  progress: number;
  docSize: number;
}

function state(): UiStateInterface {
  return {
    isPageLoading: false,
    hasNewContent: false,
    progress: 0,
    docSize: 0
  };
}

export default state;
