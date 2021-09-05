import { useEffect } from 'react';

export default function useOutsideClick(ref: any, onClick: any) {
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}
