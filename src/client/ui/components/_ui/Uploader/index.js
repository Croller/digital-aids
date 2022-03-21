import React, { forwardRef } from 'react';
import { imageCompression } from 'client/utils/common';
import { PictureAddSvg, TrashSvg, EditSvg } from 'client/assets/images';
import { useTranslation } from 'react-i18next';

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
  Edit,
} from './styled';

export const Uploader = forwardRef(({
  disabled = false,
  max = 1,
  files = [],
  maxSize = 15,
  onUpload = () => {},
  onStatus = () => {},
  onEdit = () => {},
  className,
}, ref) => {
  const types = ['image/png', 'image/jpeg'];
  const [t] = useTranslation();

  const handleChange = async (info) => {
    const { file } = info;
    if (file) {
      const support = types.includes(file.type);
      const size = file.size / 1024 / 1024 < maxSize;
      if (!support) {
        onStatus({ type: 'warning', content: t('common.form.file.error.type') });
        return;
      }
      if (!size) {
        onStatus({ type: 'warning', content: `${t('common.form.file.error.size')} ${maxSize} Mb` });
        return;
      }
    }
    onStatus({ type: 'loading', content: `${t('common.words.loading')}...` });

    const compresed = await imageCompression(file, { maxSizeMB: maxSize });
    // console.log('file compresed', file.size / 1024 / 1024, compresed.originFileObj.size / 1024 / 1024);

    onUpload([...files, compresed], null);
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
      {files.length < max && (
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
          {files && files.length <= max && uploadButton}
        </UploadStyled>
      )}
      <List className="list-images">
        {files && files.length > 0 && files.map((file) => (
          <ImgBlock key={`_image_${file.uuid}`}>
            <Img src={file.base64} onError={handleError} />
            <Delete show={!disabled} onClick={() => handleDelete(file)}>
              <TrashSvg />
            </Delete>
            <Edit show={!disabled} onClick={() => onEdit(file)}>
              <EditSvg />
            </Edit>
          </ImgBlock>
        ))}
      </List>
    </Wrapper>
  );
});
