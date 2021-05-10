import React, { useEffect } from 'react';
import { OpinionMail } from 'client/ui/components/Mails/Opinion';

import {
  MailsWrapper,
  Block,
} from './styled';

const OPINION_DATA = {
  rating: {
    covid: 'disappointed',
    meal: 'angry',
    menu: 'satisfied',
    service: 'satisfied',
  },
  comments: 'Test',
};

const Mails = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <MailsWrapper>
      <Block>
        <OpinionMail {...OPINION_DATA} />
      </Block>
    </MailsWrapper>
  );
};

export default Mails;

