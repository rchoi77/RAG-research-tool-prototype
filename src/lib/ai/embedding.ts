// Resource chunk generating logic. Right now, split into sentences.
const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter(i => i !== '');
};