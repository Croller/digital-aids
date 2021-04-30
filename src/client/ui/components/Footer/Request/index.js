import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PaperPlaneSvg, Email1Svg, TelephoneSvg } from 'client/assets/images';
import { 
  Wrapper,
  Contacts,
  Title,
  SpanGreen,
  Hr,
  Contact,
  FormStyled,
  Control,
  ControlGroup,
  Label,
  InputStyled,
  TextAreaStyled,
  SendButton,
} from './styled';

export const Request = () => {
  const [t] = useTranslation();
  const { phone, email } = useSelector(store => store.company);

  const handleRoute = (path = '/', external = false) => {
    if (external) {
      if (['tel', 'mailto'].some(s => path.indexOf(s) > -1)) {
        document.location.href = path;
        return null;
      }
    }
  };

  return (
    <Wrapper>
      <Contacts>
        <Title>
          {t('present.request.title1')}
          <SpanGreen>
            {t('present.request.title2')}
          </SpanGreen>
        </Title>
        <PaperPlaneSvg />
        <Hr />
        <Contact onClick={() => handleRoute(`tel:${phone}`, true)}>
          <TelephoneSvg />
          {phone}
        </Contact>
        <Contact onClick={() => handleRoute(`mailto:${email}`, true)}>
          <Email1Svg />
          {email}
        </Contact>
      </Contacts>
      <FormStyled>
        <Control>
          <Label>
            {t('present.request.form.name')}
          </Label>
          <InputStyled
            placeholder={t('present.request.form.placeholder')}
          />
        </Control>
        <ControlGroup>
          <Control>
            <Label>
              {t('present.request.form.email')}
            </Label>
            <InputStyled
              placeholder={t('present.request.form.placeholder')}
            />
          </Control>
          <Control>
            <Label>
              {t('present.request.form.phone')}
            </Label>
            <InputStyled
              placeholder={t('present.request.form.placeholder')}
            />
          </Control>
        </ControlGroup>
        <Control>
          <Label>
            {t('present.request.form.owner.title')}
          </Label>
          <InputStyled
            placeholder={t('present.request.form.owner.placeholder')}
          />
        </Control>
        <Control>
          <Label>
            {t('present.request.form.message')}
          </Label>
          <TextAreaStyled
            rows={8}
            placeholder={t('present.request.form.placeholder')}
          />
        </Control>
        <SendButton>
          {t('present.request.form.send')}
        </SendButton>
      </FormStyled>
    </Wrapper>
  );
};
