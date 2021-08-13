class HelperService {
  playAudio(audioBase64: string) {
    const audio = new Audio(audioBase64);
    return audio;
  }
}

const helperService = new HelperService();
export default helperService;
