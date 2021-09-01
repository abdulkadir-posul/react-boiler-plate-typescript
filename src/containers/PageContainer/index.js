import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header';
import Loader from '../../components/Loader';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { IconButton } from '../../components/IconButton';

import { Link } from 'react-router-dom';

export default function PageContainer({ children }) {
  const isLoggedIn = useSelector((state) => state.user.logged);
  const isLoading = useSelector((state) => state.loader.loading);
  const { t, i18n } = useTranslation();
  const { language, languages } = i18n;

  const classes = classNames('page-container', {
    'guest-user': !isLoggedIn,
  });

  const onLangSelect = async (language) => {
    await i18n.changeLanguage(language);
  };

  return (
    <div className={classes}>
      <Header>
        <LanguageSwitcher language={language} languages={languages} onSelect={onLangSelect} />
        {isLoggedIn && (
          <div>
            <Link to={'/logout'}>
              <IconButton icon="fa-sign-out-alt">{t('Logout')}</IconButton>
            </Link>

            <Link to={'newPage'}>
                newPage
            </Link>
          </div>
        )}
      </Header>
      <main>{children}</main>
      {isLoading && <Loader />}
    </div>
  );
}
