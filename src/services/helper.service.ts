class HelperService {
  async playAudio(audioBase64: string): Promise<HTMLAudioElement> {
    const audio = new Audio(audioBase64);
    return new Promise(resolve => {
      resolve(audio);
    });
  }
}

const helperService = new HelperService();
export default helperService;
