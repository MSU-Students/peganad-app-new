import { localbaseService } from 'src/services/localbase.service';
import firestore from 'src/services/firestore.service';
import { IContent } from 'src/interfaces/common-interface';
import fireStoreService from 'src/services/firestore.service';

class ContentService {
  async downloadContent(category: string) {
    let localContent = await localbaseService.getContents(category);
    let onlineContent = await fireStoreService.getContents(category);
    if (
      !localContent ||
      localContent.length == 0 ||
      (onlineContent.length != 0 &&
        localContent.length != onlineContent.length &&
        navigator.onLine)
    ) {
      console.log(
        'localContent: ',
        localContent,
        'onlineContent: ',
        onlineContent
      );
      const res = await localbaseService.setContent(category, onlineContent);
      res.sort(() => Math.random() - 0.5);
      return res;
    } else {
      const res = await localbaseService.setContent(category, localContent);
      res.sort(() => Math.random() - 0.5);
      return res;
    }
  }

  async appendContent(
    onlineContent: IContent[],
    category: string
  ): Promise<IContent[]> {
    let localContent = await localbaseService.getContents(category);
    if (
      !localContent ||
      localContent.length == 0 ||
      (onlineContent.length != 0 &&
        localContent.length != onlineContent.length &&
        navigator.onLine)
    ) {
      console.log(
        'localContent: ',
        localContent,
        'onlineContent: ',
        onlineContent
      );
      const res = await localbaseService.setContent(category, onlineContent);
      res.sort(() => Math.random() - 0.5);
      return res;
    } else {
      const res = await localbaseService.setContent(category, localContent);
      res.sort(() => Math.random() - 0.5);
      return res;
    }
  }

  async paginateContents(
    contents: IContent[],
    contentPosition: number
  ): Promise<IContent[]> {
    return new Promise(resolve => {
      const extractContent = contents;
      const paginate = (array: IContent[], index: number, size: number) => {
        // transform values
        index = typeof index == 'string' ? Math.abs(parseInt(index)) : index;
        index = index > 0 ? index - 1 : index;
        size = typeof size == 'string' ? parseInt(size) : size;
        size = size < 1 ? 1 : size;
        // filter
        return [
          ...extractContent.filter((value, n) => {
            return n >= index * size && n < (index + 1) * size;
          })
        ];
      };
      if (contentPosition <= extractContent.length) {
        const transform = paginate(extractContent, contentPosition, 1);
        resolve(transform);
      } else {
        resolve([]);
      }
    });
  }

  async generateRandomAnswer(
    contents: IContent[],
    correctAns: string
  ): Promise<IContent[]> {
    return new Promise(resolve => {
      const extractContent = contents;
      const answersArr: IContent[] = [];

      extractContent.forEach((content: IContent) => {
        answersArr.unshift(content.translatedName as any);
      });

      answersArr.sort(() => Math.random() - 0.5); // random the new elements
      const correctAnswer = correctAns;
      const newAnsArr = answersArr.filter((item: any) => item != correctAnswer); // Remove answer in array
      newAnsArr.length = 3; // Limit length
      newAnsArr.unshift(correctAnswer as any); // Add answer array
      newAnsArr.sort(() => Math.random() - 0.5); // random the new elements
      resolve(newAnsArr);
    });
  }
}

const contentService = new ContentService();
export default contentService;
