import { localbaseService } from 'src/services/localbase.service';
import firestore from 'src/services/firestore.service';

class ContentService {
  async appendContent(content: string): Promise<void> {
  }
  checkLocalContent() {}
  checkNewContent() {}
}

const contentService = new ContentService();
export default contentService;
