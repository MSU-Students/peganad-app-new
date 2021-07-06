import { localbaseService } from 'src/services/localbase.service';
import firestore from 'src/services/firestore.service';
import { IContent } from 'src/interfaces/common-interface';
import fireStoreService from 'src/services/firestore.service';

class ContentService {
  async appendContent(
    content: IContent[],
    category: string
  ): Promise<IContent[]> {
    let localContent = await localbaseService.getAnimals(category);
    if (!localContent || localContent.length != content.length) {
      let result = await localbaseService.setContent(category, content);
      return result;
    }
    return localContent;
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

      const correctAnswer = correctAns;
      const newAnsArr = answersArr.filter(
        item => item.translatedName != correctAnswer
      ); // Remove answer in array
      newAnsArr.length = 3; // Limit length
      newAnsArr.unshift(correctAnswer as any); // Add answer array
      newAnsArr.sort(() => Math.random() - 0.5); // random the new elements
      resolve(newAnsArr);
    });
  }
}

const contentService = new ContentService();
export default contentService;
