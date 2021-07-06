class HelperService {
  async playAudio(audioBase64: string) {
    const audio = new Audio(audioBase64);
    await audio.play();
    return new Promise(resolve => {
      audio.onended = () => {
        resolve({
          playEnded: false
        });
      };
    });
  }
}

const helperService = new HelperService();
export default helperService;
