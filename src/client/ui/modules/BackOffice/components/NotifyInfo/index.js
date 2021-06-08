import React, { memo } from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
// import { useModal } from 'react-modal-hook';
// import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import {
  BellSvg,
  CalendarSvg,
  ThumbsUpSvg,
} from 'client/assets/images';
import { 
  Wrapper,
  Person,
  Date,
  Controls,
  Control,
} from './styled';

export const NotifyInfo = memo(({
  id,
  options,
  // table_number,
  create_at,
  is_viewed,
  className,
  onEvent = () => {},
}) => {
  const [t] = useTranslation();

  const handleEvent = (bool) => {
    onEvent({ id, is_viewed: bool });
  };

  const getEvent = () => {
    if (!options) return null;
    const event = Object.keys(options).find(f => options[f] && f);
    return event;
  };

  return (
    <Wrapper className={className}>
      <Person
        icon={<BellSvg />}
        text={t(`common.words.${getEvent()}`)}
      />
      <Date
        icon={<CalendarSvg />}
        text={(
          <>
            {moment(create_at).format('DD.MM.YYYY')}
            <br />
            {moment(create_at).format('HH:mm')}
          </>
        )}
      />
      <Controls>
        <Tooltip placement="top" title={t('common.words.approved')}>
          <Control
            disabled={is_viewed}
            onClick={() => handleEvent(true)}
          >
            <ThumbsUpSvg />
          </Control>
        </Tooltip>
      </Controls>
    </Wrapper>
  );
});
