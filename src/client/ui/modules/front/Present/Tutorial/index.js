import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  TranslationSvg,
  Tutorial1Png,
  OnlineChatSvg,
  Tutorial2Png,
  GlutenFreeSvg,
  Tutorial3Png,
  FileSvg,
  Tutorial4Png,
  SmartphoneSvg,
  Tutorial5Png,
  SocialCareSvg,
  Tutorial6Png,
  WineBottleSvg,
  Tutorial7Png,
  ChefsHatSvg,
  Tutorial8Png,
  OnlineBookingSvg,
  Tutorial9Png,
  RepeatSvg,
  Tutorial10Png,
  ChevronSvg,
} from 'client/assets/images';
import {
  Container,
  Content,
  Control,
  Parts,
  Part,
  PartImg,
  PartContent,
  PartTitle,
  PartDescription,
  FormBlock,
  RequestStyled,
} from './styled';

const Tutorial = () => {
  const history = useHistory();
  const [t] = useTranslation();

  const parts = [
    {
      icon: <TranslationSvg />,
      src: Tutorial1Png,
    },
    {
      icon: <OnlineChatSvg />,
      src: Tutorial2Png,
    },
    {
      icon: <GlutenFreeSvg />,
      src: Tutorial3Png,
    },
    {
      icon: <FileSvg />,
      src: Tutorial4Png,
    },
    {
      icon: <SmartphoneSvg />,
      src: Tutorial5Png,
    },
    {
      icon: <SocialCareSvg />,
      src: Tutorial6Png,
    },
    {
      icon: <WineBottleSvg />,
      src: Tutorial7Png,
    },
    {
      icon: <ChefsHatSvg />,
      src: Tutorial8Png,
    },
    {
      icon: <OnlineBookingSvg />,
      src: Tutorial9Png,
    },
    {
      icon: <RepeatSvg />,
      src: Tutorial10Png,
    },
  ];
  
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Container>
      <Content>
        <Control onClick={() => history.push('/')}>
          <ChevronSvg />
          {t('present.tutorial.back')}
        </Control>
        <Parts>
          {parts.map(({ icon, src }, p) => (
            <Part key={`_tutorial_part_${p + 1}`}>
              <PartImg src={src} />
              <PartContent>
                {icon}
                <PartTitle>
                  {t(`present.tutorial.part${p + 1}.title`)}
                </PartTitle>
                <PartDescription>
                  {t(`present.tutorial.part${p + 1}.description`)}
                </PartDescription>
              </PartContent>
            </Part>
          ))}
        </Parts>
        <FormBlock>
          <RequestStyled />
        </FormBlock>
      </Content>
    </Container>
  );
};

export default Tutorial;
