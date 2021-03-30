import {customAlphabet} from 'nanoid';
import 'react-native-get-random-values';

const EASY_CHARACTERS = 'abcdefghjkmnpqrstuvwxyz';
const nanoid = customAlphabet(EASY_CHARACTERS, 5);

export default function createId() {
  return nanoid();
}
