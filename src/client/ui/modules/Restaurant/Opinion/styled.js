import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { TextAreaForm } from 'client/ui/components/_ui/TextArea';
import { FONTS, THEME, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  display: block;
  padding: 22px 27px;
`;

export const Title = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 9px;
`;

export const Description = styled.p`
  font-family: ${FONTS.regular};
  font-size: 16px;
  margin-bottom: 27px;
  line-height: 20px;
`;

export const RateWrapper = styled.div`
  display: block;
`;

export const RateContainer = styled.div`
  margin-bottom: 10px;
`;

export const RateTitle = styled.h3`
  font-family: ${FONTS.bold};
  font-size: 16px;
  margin-bottom: 22px;
  text-transform: uppercase;
`;

export const ValuationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  > button {
    &:nth-child(2n+1) {
      margin-right: 22px;
    }
  }
`;

export const Valuation = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 84px;
  flex: 45%;
  font-family: ${FONTS.regular};
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadiusM};
  background-color: ${p => (p.active ? `${PALETTE.grey16}` : `${PALETTE.white}`)};
  color: ${PALETTE.black};
  margin-bottom: 22px;
`;

export const EmojiWrapper = styled.h4`
  margin: 0;
  margin-bottom: -6px;
  margin-top: -10px;
  font-size: 40px;
`;

export const CommentTitle = RateTitle;

export const CommentControl = styled(TextAreaForm)`
  margin-bottom: 38px;
`;

export const SendButton = styled(Button)`
  height: 52px;
  background-color: ${PALETTE.green1};
  text-transform: uppercase;
  color: ${PALETTE.white};
`;
