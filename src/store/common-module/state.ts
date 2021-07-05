import { IContent } from 'src/interfaces/common-interface';

export interface CommonStateInterface {
  contents: IContent[];
}

function state(): CommonStateInterface {
  return {
    contents: [],
  };
}

export default state;
