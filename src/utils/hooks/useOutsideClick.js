import { useEffect } from 'react';

export default function useOutsideClick(ref, onClick) {
  function handleClickOutside(event) {
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
