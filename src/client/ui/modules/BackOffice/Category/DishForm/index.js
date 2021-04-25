import React, { memo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { showMessage } from 'client/ui/components/_ui/Message';
import { dataToForm, dataToApi, model } from 'client/store/backOffice/mapper/restaurant';
import { getUrl, loadFile } from 'client/utils/common';
import { rules, collectError } from 'client/utils/validatorRules';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import {
  FloppyDiskSvg,
  ArchiveSvg,
  PlusSvg,
  TrashSvg,
} from 'client/assets/images';
import {
  DishFormWrapper,
  FormStyled, FormCol, Form2Col, Form3Col,
  FormItemSubmit,
  Controls,
  Control,
  FormItemStyled,
  InputStyled, 
  Hr,
  SelectStyled, OptionStyled,
  UploaderImage,
} from './styled';

const CONTROL_CONFIG = [
  {
    key: 'save',
    icon: <FloppyDiskSvg />,
  },
  {
    key: 'archive',
    icon: <ArchiveSvg />,
  },
  {
    key: 'restore',
    icon: <PlusSvg />,
  },
  {
    key: 'delete',
    icon: <TrashSvg />,
  },
];

export const DishForm = memo(({
  dish = null,
  dictionary = null,
  loading = false,
  onChangeDish = () => {},
  onChangeFiles = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const rule = rules(t);
  const { pathname } = useLocation();
  const [formData, setFormData] = useState(null);
  const [deletedFiles, setDeletedFiles] = useState(null);
  const [isChange, setIsChnage] = useState(false);
  const [loadFiles, setLoadFiles] = useState(true);
  const [event, setEvent] = useState(null);
  const [showConfirm, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t(`backOffice.confirmModal.dish.${event.key}`)}
      textOk={t(`common.words.${event.key}`)}
      textCancel={t('common.words.doNot')}
      onCancel={hideConfirm}
      onClose={hideConfirm}
      onOk={() => {
        hideConfirm();
        onChangeDish(event.params);
      }}
    />
  ), [event]);

  const [form] = FormStyled.useForm();

  const initValue = () => {
    const data = { ...(dish || model) };

    setFormData(dataToForm({ ...data, images: [] }));
    if (data.images && data.images.length > 0) {
      Promise.all(data.images.map(async (uuid) => {
        const file = await loadFile(`${getUrl()}/static/restaurants/dishes/${uuid}.png`, uuid);
        return file;
      })).then(images => setFormData(dataToForm({ ...data, images })));
    }
    setLoadFiles(false);
  };

  const getControl = () => {
    const arr = [...CONTROL_CONFIG];
    if (pathname.indexOf('/dishes') > -1) {
      if (pathname.indexOf('/dishes/archive') > -1) {
        return arr.splice(0, 2);
      }
      if (isChange) {
        if (!dish) {
          return [arr[0], arr[3]];
        }
        return arr.slice(-2);
      }
      return [arr[3]];
    }
    return [];
  };

  const handleControlEvent = (key) => {
    const params = { id: dish.id };
    if (key === 'restore') params.is_archived = false;
    if (key === 'delete') params.is_deleted = true;
    if (key === 'archive') params.is_archived = true;

    setEvent({ key, params });
    showConfirm();
  };

  const handleUpload = (files, deleted = null) => {
    const list = [...files];
    if (deleted && list.some(s => s && s.uuid === deleted.uuid)) {
      setDeletedFiles([...(deletedFiles || []), `/restaurants/dishes/${deleted.uuid}.png`]);
    }
    setFormData({ ...formData, images: [...list] });
    setIsChnage(true);
  };

  const handleFinish = (values) => {
    const edited = dataToApi({ ...formData, ...values }, { ...(dish || model) });
    onChangeDish(edited);
    deletedFiles && onChangeFiles('delete', deletedFiles);
    setIsChnage(false);
  };

  // const handleDelete = (obj) => {
  //   onChangeDish(update({ name: 'data_dishes', data: { id: params.restaurant, ...obj } }));
  // };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = (values) => {
    console.log('values - ', values);
    setIsChnage(true);
  };

  useEffect(() => {
    initValue();

    return () => {
      form.resetFields();
    };
  }, []);

  return formData && (
    <DishFormWrapper className={className}>
      <FormStyled
        form={form}
        layout="vertical"
        initialValues={formData}
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
        onFinishFailed={handleFinishFailed}
      >
        <Form2Col>
          <FormCol>
            {!loadFiles && (
              <UploaderImage
                files={formData.images}
                onUpload={handleUpload}
                onStatus={showMessage}
                max={1}
              />
            )}
          </FormCol>
          <FormCol>
            <FormItemStyled
              label={t('common.words.name')}
              name="name"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItemStyled>
            <FormItemStyled
              label={t('common.words.description')}
              name="description"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.text')}
              />
            </FormItemStyled>
            <Hr />
            <Form3Col>
              <FormItemStyled
                label={t('common.words.allergens')}
                name="allergens"
                required
                rules={rule.text}
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItemStyled>
              <FormItemStyled
                label={t('common.words.weight')}
                name="weight"
                required
                rules={rule.text}
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItemStyled>
              <FormItemStyled
                label={t('common.words.price')}
                name="price"
                required
                rules={rule.text}
              >
                <InputStyled
                  placeholder={t('common.form.text')}
                />
              </FormItemStyled>
            </Form3Col>
          </FormCol>
        </Form2Col>
        <FormItemSubmit>
          <Controls>
            {getControl().map(({ key, icon }) => (
              <Tooltip key={key} placement="top" title={t(`common.words.${key}`)}>
                <Control
                  {...(key === 'save' && {
                    loading,
                    htmlType: 'submit',
                    disabled: !isChange,
                  })}
                  onClick={() => handleControlEvent(key)}
                >
                  {icon}
                </Control>
              </Tooltip>
            ))}
          </Controls>
        </FormItemSubmit>
      </FormStyled>
    </DishFormWrapper>
  );
});
