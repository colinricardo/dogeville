import { customAlphabet } from "nanoid";
import { v4 } from "uuid";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SIZE = 16;

const nanoid = customAlphabet(ALPHABET, SIZE);

export const randomId = () => {
  return nanoid();
};

export const randomUuid = () => {
  return v4();
};
