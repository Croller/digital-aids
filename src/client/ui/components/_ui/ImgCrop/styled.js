import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export const ImgCropWrapper = styled.div`
  margin-bottom: 20px;
`;

export const ReactCropStyled = styled(ReactCrop)`
  > div {
    .ReactCrop__image {
      height: 600px;
      object-fit: contain;
      object-position: center;
    }
  }
`;
