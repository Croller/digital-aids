import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FooterWrapper, FooterContainer,
  Roles,
  ControlWrapper,
  LinkButton,
} from './styled';

const FooterComponent = ({
  className,
}) => {
  const [t] = useTranslation();
  const links = [
    {
      key: 'rights',
      title: t('present.footer.rights'),
      link: '',
    },
    {
      key: 'politica',
      title: t('present.footer.politica'),
      link: '',
    },
    {
      key: 'cookies',
      title: t('present.footer.cookies'),
      link: '',
    },
  ];

  const handleRoute = (path = '/', external = false) => {
    if (external) {
      if (path.indexOf('tel') > -1) {
        document.location.href = path;
        return null;
      }
      window.open(path, '_blank').focus();
    }
    if (history.action !== 'POP' && path === 'back') {
      history.goBack();
      return null;
    }
    history.push(path === 'back' ? 'categories' : path);
  };

  return (
    <FooterWrapper className={className}>
      <FooterContainer>
        <Roles>
          {t('present.footer.rules')}
        </Roles>
        <ControlWrapper>
          {links.map(({ key, title, link }) => (
            <LinkButton
              key={key}
              onClick={() => handleRoute(link)}
            >
              {title}
            </LinkButton>
          ))}
        </ControlWrapper>
      </FooterContainer>
    </FooterWrapper>
  );
};

export const Footer = React.memo(withRouter(FooterComponent));
