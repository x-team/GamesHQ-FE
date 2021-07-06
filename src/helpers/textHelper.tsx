export const truncateText = (input: string, maxChar: number) =>
    input.length > maxChar ? `${input.substring(0, maxChar)}..` : input;
