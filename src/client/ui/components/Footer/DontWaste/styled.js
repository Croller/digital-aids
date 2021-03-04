import styled from 'styled-components';
import { PALETTE, FONTS } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button/Btn';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 56px 44px 56px;
`;

export const Hr = styled.hr`
  width: 100%;
  margin: 0;
  margin-bottom: 18px;
  border: 0.4px solid ${PALETTE.grey10};
`;

export const Description = styled.p`
  font-size: 16px;
  font-family: ${FONTS.semiBold};
  text-align: center;
  white-space: pre-line;
  margin: 0;
  margin-bottom: 28px;
  line-height: 28px;
`;

export const SocialWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SocialButton = styled(Button)`
  height: 26px;
  background-color: transparent;

  &:not(:last-child) {
    margin-right: 26px;
  }

  > svg {
    width: 24px;
    height: 24px;
  }
`;
