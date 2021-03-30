import {useCallback} from 'react';
import {Toast} from '@ant-design/react-native';
import copy from 'copy-to-clipboard';

export default function useCopy() {
  return useCallback(() => {
    copy(window.location.href);

    Toast.info('Copied!', 2, null, false);
  }, []);
}
