import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import langMap from 'langmap';

import useOutsideClick from '../../utils/hooks/useOutsideClick';

export default function LanguageSwitcher({ languages, language, onSelect }) {
  const [isSelectorOpen, setSelectorOpen] = useState(false);
  const wrapperRef = useRef(null);

  const sortedLanguages = useMemo(() => languages.sort(), [languages]);

  const toggleSelector = (e) => {
    e.preventDefault();
    setSelectorOpen(!isSelectorOpen);
  };

  const changeLanguage = (language) => async (e) => {
    e.preventDefault();
    onSelect(language);
    setSelectorOpen(false);
  };

  useOutsideClick(wrapperRef, () => setSelectorOpen(false));

  return (
    <div className="language-switcher" ref={wrapperRef}>
      <button className="selected" onClick={toggleSelector}>
        {language.toUpperCase()} <i className="fas fa-sort-down" />
      </button>
      {isSelectorOpen && (
        <div className="languages">
          {sortedLanguages.map((language, key) => (
            <a
              className={`language ${language}`}
              href={`#${language}`}
              lang={language}
              hrefLang={language}
              key={key}
              onClick={changeLanguage(language)}
            >
              {language in langMap ? langMap[language].nativeName : language.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

LanguageSwitcher.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  language: PropTypes.string.isRequired,
};
