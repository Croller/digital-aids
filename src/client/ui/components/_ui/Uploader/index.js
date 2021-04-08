import React, { useState, useEffect, forwardRef } from 'react';
// import { Modal } from 'antd';
import { getBase64 } from 'client/utils/common';
import { PictureAddSvg, TrashSvg } from 'client/assets/images';
import { useTranslation } from 'react-i18next';
import { Message } from 'client/ui/components/_ui/Message';
import { v4 as uuidv4 } from 'uuid';
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
  max = 1,
  files = [],
  onUpload = () => {},
  className,
}, ref) => {
  const limitSize = 15;
  const types = ['image/png', 'image/jpeg'];
  const [t] = useTranslation();
  const [error, setError] = useState(null);
  // const [previewShow, setPreviewShow] = useState(false);
  // const [previewImg, setPreviewImg] = useState({
  //   image: '',
  //   title: '',
  // });

  // const handleCancel = () => setPreviewShow(false);

  const handleChange = (info) => {
    const { fileList } = info;
    const filtred = fileList.filter(f => types.includes(f.type));
    const updated = filtred.map(async (file) => ({
      ...file,
      filename: `${uuidv4()}.${file.type.replace('image/', '')}`,
      base64: await getBase64(file.originFileObj),
    }));
    Promise.all(updated).then(values => {
      onUpload(values);
    });
  };

  // const handlePreview = async data => {
  //   const file = { ...data };
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   setPreviewShow(true);
  //   setPreviewImg({
  //     image: file.url || file.preview,
  //     title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
  //   });
  // };
  
  const handlebeforeUpload = file => {
    const support = types.includes(file.type);
    const size = file.size / 1024 / 1024 < limitSize;
    if (!support) {
      setError(t('common.form.file.error.type'));
    }
    if (!size) {
      setError(`${t('common.form.file.error.size')} ${limitSize}`);
    }
    return support && size;
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

  const uploadButton = (
    <Adder>
      <Icon>
        <PictureAddSvg />
      </Icon>
      <Text style={{ marginTop: 8 }}>
        {t('common.words.upload')}
      </Text>
    </Adder>
  );

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper className={className}>
      <UploadStyled
        ref={ref}
        maxCount={max}
        showUploadList={false}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={files}
        beforeUpload={handlebeforeUpload}
        // onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleUpload}
      >
        {files && files.length >= max ? null : uploadButton}
      </UploadStyled>
      <List className="list-images">
        {files && files.length > 0 && files.map((file, f) => (
          <ImgBlock key={`_image_${f + 1}_${file.filename}`}>
            <Img src={file.base64} />
            <Delete onClick={() => handleDelete(file)}>
              <TrashSvg />
            </Delete>
          </ImgBlock>
        ))}
      </List>
      {/* <Modal
        visible={previewShow}
        title={previewImg.title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImg.image} />
      </Modal> */}
      <Message type="error" content={error} />
    </Wrapper>
  );
});
