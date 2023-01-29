import { authModalState, ModalView } from '@/atoms/authModal';
import { useSetRecoilState } from 'recoil';

export const useSetAuthModalView = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const setAuthModalView = (view: ModalView) => {
    setAuthModalState((prev) => ({ ...prev, view }));
  };
  const setAuthModalIsOpen = (open: boolean, view?:ModalView) => {
    setAuthModalState({ open: open, view: view || "login" });
  };

  return { setAuthModalView, setAuthModalIsOpen };
};
