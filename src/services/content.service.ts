import { localbaseService } from 'src/services/localbase.service';
import { IContent } from 'src/interfaces/common-interface';
import Routes from '../router';

class ContentService {
  async appendContent(
    onlineContent: IContent[],
    category: string,
    path: string
  ): Promise<IContent[]> {
    let localContent = await localbaseService.getContents(category);
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
        }
        return res;
      } else {
        return [];
      }
    } else {
      const res = await localbaseService.setContent(category, localContent);
      if (path != 'learn-content') {
        res.sort(() => Math.random() - 0.5);
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
          let newContent: IContent[] = [];
          docData.map(async doc => {
            let updatedContent = {
              name: doc.name,
              translatedName: doc.translatedName,
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
        var res = await fetch(url);
        var blob = await res.blob();

        return new Promise((resolve, reject) => {
          var reader: any = new FileReader();
          reader.addEventListener(
            'load',
            function() {
              var base64data = reader.result.substr(
                reader.result.indexOf(',') + 1
              );
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
