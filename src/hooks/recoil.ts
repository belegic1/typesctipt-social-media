import { authModalState } from '@/atoms/authModal';
import { useSetRecoilState } from 'recoil';

export const useSetAuthModalView = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const setAuthModalView = (view: 'login' | 'signup' | 'resetPassword') => {
    setAuthModalState((prev) => ({ ...prev, view }));
  };
  const setAuthModalIsOpen = (open: boolean) => {
    setAuthModalState((prev) => ({ ...prev, open: open }));
  };

  return { setAuthModalView, setAuthModalIsOpen };
};
