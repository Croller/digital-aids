import React, { memo } from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
// import { useModal } from 'react-modal-hook';
// import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import {
  // AlertCircleSvg,
  UserCircleSvg,
  PhoneCallSvg,
  CalendarSvg,
  PlusSvg,
  CloseSvg,
} from 'client/assets/images';
import { 
  Wrapper,
  Person,
  Contact,
  Date,
  Controls,
  Control,
} from './styled';

export const ReservationInfo = memo(({
  id,
  name,
  email,
  phone,
  reserve_at,
  is_approved,
  className,
  onEvent = () => {},
}) => {
  const [t] = useTranslation();

  const handleEvent = (bool) => {
    onEvent({ id, is_approved: bool });
  };

  return (
    <Wrapper className={className}>
      <Person
        icon={<UserCircleSvg />}
        text={name}
      />
      <Contact
        icon={<PhoneCallSvg />}
        text={(
          <>
            {email}
            <br />
            {phone}
          </>
        )}
      />
      <Date
        icon={<CalendarSvg />}
        text={(
          <>
            {moment(reserve_at).format('DD.MM.YYYY')}
            <br />
            {moment(reserve_at).format('HH:mm')}
          </>
        )}
      />
      <Controls>
        <Tooltip placement="top" title={t('common.words.approved')}>
          <Control
            disabled={is_approved !== null}
            onClick={() => handleEvent(true)}
          >
            <PlusSvg />
          </Control>
        </Tooltip>
        <Tooltip placement="top" title={t('common.words.denied')}>
          <Control
            disabled={is_approved !== null}
            onClick={() => handleEvent(false)}
          >
            <CloseSvg />
          </Control>
        </Tooltip>
      </Controls>
    </Wrapper>
  );
});
