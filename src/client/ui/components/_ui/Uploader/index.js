import React, { forwardRef } from 'react';
import { getBase64, imageToPng, validateBase64 } from 'client/utils/common';
import { PictureAddSvg, TrashSvg } from 'client/assets/images';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
// import Compressor from 'compressorjs';

import {
  Wrapper,
  Adder,
  Icon,
  Text,
  UploadStyled,
  List,
  ImgBlock,
  Img,
  Delete,
} from './styled';

export const Uploader = forwardRef(({
  disabled = false,
  max = 1,
  files = [],
  onUpload = () => {},
  onStatus = () => {},
  className,
}, ref) => {
  const limitSize = 15;
  const types = ['image/png', 'image/jpeg'];
  const [t] = useTranslation();

  const handleChange = async (info) => {
    const { file } = info;
    if (file) {
      const support = types.includes(file.type);
      const size = file.size / 1024 / 1024 < limitSize;
      if (!support) {
        onStatus({ type: 'warning', content: t('common.form.file.error.type') });
        return;
      }
      if (!size) {
        onStatus({ type: 'warning', content: `${t('common.form.file.error.size')} ${limitSize}` });
        return;
      }
    }

    onStatus({ type: 'loading', content: `${t('common.words.loading')}...` });
    // const compress = await new Compressor(file.originFileObj);
    const transform = await transformFile(file);

    onUpload([...files, transform], null);
    onStatus({ type: 'success', content: `${t('common.words.success')}` });
  };

  const handleUpload = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleDelete = (file) => {
    const filtred = files.filter(f => f.uid !== file.uid);
    onUpload(filtred, file);
  };

  const handleError = (img) => {
    const image = { ...img };
    image.onerror = '';
    image.src = '/images/noimage.gif';
    return true;
  };

  const transformFile = async (file) => {
    if (file.type !== 'image/png') {
      const png = await imageToPng(file.originFileObj, uuidv4());
      return png;
    }
    return {
      ...file,
      uuid: uuidv4(),
      base64: await getBase64(file.originFileObj),
    };
  };

  const uploadButton = (
    <Adder>
      <Icon>
        <PictureAddSvg />
      </Icon>
      {!disabled && (
        <Text>
          {t('common.words.upload')}
        </Text>
      )}
    </Adder>
  );

  return (
    <Wrapper className={className}>
      <UploadStyled
        ref={ref}
        maxCount={max}
        showUploadList={false}
        listType="picture-card"
        fileList={files}
        onChange={handleChange}
        customRequest={handleUpload}
        disabled={disabled}
      >
        {files && files.length >= max ? null : uploadButton}
      </UploadStyled>
      <List className="list-images">
        {files && files.length > 0 && files.map((file) => (
          <ImgBlock key={`_image_${file.uuid}`}>
            <Img src={file.base64} onError={handleError} />
            <Delete show={!disabled} onClick={() => handleDelete(file)}>
              <TrashSvg />
            </Delete>
          </ImgBlock>
        ))}
      </List>
    </Wrapper>
  );
});
