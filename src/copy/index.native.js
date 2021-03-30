import {useCallback} from 'react';
import {Toast} from '@ant-design/react-native';
import Clipboard from '@react-native-community/clipboard';
import {useGame} from '../../contexts';

export default function useCopy() {
  const [game] = useGame();
  return useCallback(() => {
    Clipboard.setString(game.id);

    Toast.info('Copied!', 2, null, false);
  }, [game.id]);
}
