import { localbaseService } from 'src/services/localbase.service';
import { IContent } from 'src/interfaces/common-interface';

class ContentService {
  async appendContent(
    onlineContent: IContent[],
    category: string,
    path: string
  ): Promise<IContent[]> {
    const localContent = await localbaseService.getContents(category);
    if (
      !localContent ||
      localContent.length == 0 ||
      (onlineContent.length != 0 &&
        localContent.length != onlineContent.length &&
        navigator.onLine)
    ) {
      if (onlineContent.length != 0) {
        const res = await this.updateContent(category, onlineContent);
        if (path != 'learn-content') {
          res.sort(() => Math.random() - 0.5);
          // res.splice(10, res.length);
          if (res.length >= 10) {
            res.length = 10;
          }
        }
        return res;
      } else {
        return [];
      }
    } else {
      const res = await localbaseService.setContent(category, localContent);
      if (path != 'learn-content') {
        res.sort(() => Math.random() - 0.5);
        // res.splice(10, res.length);
        if (res.length >= 10) {
          res.length = 10;
        }
      }
      return res;
    }
  }

  async updateContent(
    category: string,
    docData: IContent[]
  ): Promise<IContent[]> {
    // updating content into new base64 value
    return new Promise(resolve => {
      try {
        if (typeof docData != 'undefined') {
          const newContent: IContent[] = [];
          docData.map(async doc => {
            const updatedContent = {
              ...doc,
              img: (await this.getBase64FromUrl(doc.img)) as string,
              audio: (await this.getBase64FromUrl(doc.audio)) as string
            };
            newContent.push(updatedContent);
            if (newContent.length == docData.length) {
              const res = await localbaseService.setContent(
                category,
                newContent
              );
              resolve(res);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async getBase64FromUrl(url: string) {
    try {
      if (navigator.onLine) {
        const res = await fetch(url);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
          const reader: FileReader = new FileReader();
          reader.addEventListener(
            'load',
            function() {
              const base64data = reader.result;
              resolve(base64data);
            },
            false
          );

          reader.onerror = () => {
            return reject(this);
          };
          reader.readAsDataURL(blob);
        });
      }
    } catch (error) {
      console.log(error);
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
  ): Promise<string[]> {
    return new Promise(resolve => {
      const extractContent = contents;
      const answersArr: string[] = [];

      extractContent.forEach((content: IContent) => {
        answersArr.unshift(content.translatedName);
      });

      answersArr.sort(() => Math.random() - 0.5); // random the new elements
      const correctAnswer = correctAns;
      const newAnsArr = answersArr.filter((item: string) => item != correctAnswer); // Remove answer in array
      newAnsArr.length = 3; // Limit length
      newAnsArr.unshift(correctAnswer); // Add answer array
      newAnsArr.sort(() => Math.random() - 0.5); // random the new elements
      resolve(newAnsArr);
    });
  }
}

const contentService = new ContentService();
export default contentService;
