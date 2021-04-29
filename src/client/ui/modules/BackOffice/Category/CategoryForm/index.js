import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import {
  dataToForm,
  dataFromToList,
  model,
  categoryModel,
} from 'client/store/backOffice/mapper/category';
import {
  ArchiveSvg,
  CloseSvg,
  FloppyDiskSvg,
  TrashSvg,
  PlusSvg,
} from 'client/assets/images';
import {
  CategoryFormWrapper,
  FormStyled,
  Form2Col,
  FormCol,
  FormItemStyled,
  InputStyled,
  SelectStyled, OptionStyled,
  Controls, Control,
} from './styled';

export const CategoryForm = ({
  source = null,
  loading = false,
  className,
  archive = false,
  onChange = () => {},
}) => {
  const [t] = useTranslation();
  const rule = rules(t);
  const [isChange, setIsChange] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = FormStyled.useForm();
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
        setEvent(null);
        handleChange(event.key, event.params);
      }}
    />
  ), [event]);

  const setFiledsValue = (obj = null) => {
    if (!obj) return;
    setFormData(obj);
    form.setFieldsValue(obj);
  };

  const handleFinish = (values) => {
    setIsChange(false);
    form.resetFields();
    if (!event) {
      onChange(dataFromToList(values, (source || categoryModel.find(f => f.type === values.type))));
    }
  };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = (values) => {
    if (values.type) {
      const obj = categoryModel.find(f => f.type === values.type);
      setFiledsValue({
        ...formData,
        ...values,
        ...dataToForm(obj),
      });
    }
    setIsChange(true);
  };

  const handleEvent = (key) => {
    const params = { id: formData.id };

    if (key === 'restore') params.is_archived = false;
    if (key === 'delete') params.is_deleted = true;
    if (key === 'archive') params.is_archived = true;

    showConfirm();
    setEvent({ key, params });
  };

  const handleChange = (key = null, params = null) => {
    if (!key) return;
    let obj = null;

    // form.resetFields();
    if (key !== 'close') {
      obj = { ...formData, ...(params || {}) };
    }
    onChange(obj);
    setFormData(null);
  };

  useEffect(() => {
    form.resetFields();
    setFiledsValue(dataToForm(source || model));
    return () => {
      form.resetFields();
    };
  }, [source]);

  return formData && (
    <CategoryFormWrapper className={className}>
      <FormStyled
        form={form}
        layout="vertical"
        initialValues={formData}
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
        onFinishFailed={handleFinishFailed}
        scrollToFirstError
      >
        <Controls>
          {isChange && (
            <Tooltip placement="top" title={t('common.words.save')}>
              <Control
                htmlType="submit"
                loading={loading}
                disabled={!isChange}
                active
              >
                <FloppyDiskSvg />
              </Control>
            </Tooltip>
          )}
          {!archive && !isChange && source && source.id && (
            <Tooltip placement="top" title={t('common.words.archive')}>
              <Control
                loading={loading}
                onClick={() => handleEvent('archive')}
              >
                <ArchiveSvg />
              </Control>
            </Tooltip>
          )}
          {archive && source ? (
            <>
              <Tooltip placement="top" title={t('common.words.restore')}>
                <Control
                  loading={loading}
                  onClick={() => handleEvent('restore')}
                >
                  <PlusSvg />
                </Control>
              </Tooltip>
              <Tooltip placement="top" title={t('common.words.delete')}>
                <Control
                  loading={loading}
                  onClick={() => handleEvent('delete')}
                >
                  <TrashSvg />
                </Control>
              </Tooltip>
            </>
          ) : (
            <Tooltip placement="top" title={t('common.words.close')}>
              <Control
                loading={loading}
                onClick={() => handleChange('close')}
              >
                <CloseSvg />
              </Control>
            </Tooltip>
          )}
        </Controls>
        <Form2Col>
          <FormCol>
            <FormItemStyled
              label={t('common.words.type')}
              name="type"
              required
              rules={rule.text}
            >
              <SelectStyled
                showSearch
                placeholder={t('common.form.placeholder.number')}
                optionFilterProp="label"
              >
                {categoryModel.map((item, i) => (
                  <OptionStyled key={`_type_${i + 1}`} value={item.type}>{item.name}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
          </FormCol>
          <FormCol>
            <FormItemStyled
              label={t('common.words.name')}
              name="name"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
          </FormCol>
        </Form2Col>
        {['daily', 'organicWine'].includes(formData.type) && (
          <>
            <FormCol>
              {['daily', 'organicWine'].includes(formData.type) && (
                <FormItemStyled
                  label={t('common.words.info')}
                  name="options.info"
                  required
                  rules={rule.text}
                >
                  <InputStyled
                    placeholder={t('common.form.placeholder.text')}
                  />
                </FormItemStyled>
              )}
              {formData.type === 'daily' && (
                <FormItemStyled
                  label={t('common.words.descriptions')}
                  name="options.descriptions"
                  required
                  rules={rule.text}
                >
                  <InputStyled
                    placeholder={t('common.form.placeholder.text')}
                  />
                </FormItemStyled>
              )}
            </FormCol>
            {formData.type === 'daily' && (
              <Form2Col>
                <FormCol>
                  <FormItemStyled
                    label={t('common.words.price')}
                    name="options.price"
                    required
                    rules={rule.float}
                  >
                    <InputStyled
                      type="number"
                      step="0.01"
                      placeholder={t('common.form.placeholder.floatExample')}
                    />
                  </FormItemStyled>
                </FormCol>
              </Form2Col>
            )}
          </>
        )}
        {formData.children && (
          <FormCol>
            <FormItemStyled
              label={t('common.words.group')}
              name="children"
              required
              rules={rule.text}
            >
              <SelectStyled
                mode="tags"
                tokenSeparators={[',']}
                placeholder={t('common.form.placeholder.text')}
              >
                {formData.children.map((str, i) => (
                  <OptionStyled key={`_group_${i + 1}`} value={str}>{str}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
          </FormCol>
        )}
      </FormStyled>
    </CategoryFormWrapper>
  );
};
