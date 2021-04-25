import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { categoryType } from 'client/utils/constants';
import { stringToKey } from 'client/utils/common';
import { CloseSvg, FloppyDiskSvg, TrashSvg } from 'client/assets/images';
import {
  CategoryFormWrapper,
  FormStyled,
  Form2Col,
  FormCol,
  FormItemStyled,
  ControlWrapper, Control,
  InputStyled,
  // InputMaskStyled,
  SelectStyled, OptionStyled,
  // UpperCase,
} from './styled';

export const CategoryForm = ({
  source = null,
  loading = false,
  className,
  onSave = () => {},
  onDelete = () => {},
  onClose = () => {},
}) => {
  const [t] = useTranslation();
  const rule = rules(t);
  const [isChange, setIsChange] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = FormStyled.useForm();

  const handleFinish = (values) => {
    const obj = {
      ...categoryType.find(f => f.type === values.type),
      ...(source || {}),
      name: values.name,
      key: stringToKey(values.name),
      options: {
        ...Object.keys(values).reduce((item, key) => {
          if (key.indexOf('options') > -1) {
            return { ...item, [key.split('.')[1]]: values[key] };
          }
          return item;
        }, {}),
      },
    };

    onSave(obj);
    setIsChange(false);
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
      const obj = categoryType.find(f => f.type === values.type);
      setFormData({
        ...formData,
        ...obj,
        ...obj.options,
      });
    }
    setIsChange(true);
  };

  const handleDelete = () => {
    form.resetFields();
    onDelete(source);
  };

  useEffect(() => {
    let obj = { ...categoryType[0] };

    if (source && source.id) {
      obj = {
        ...source,
        ...(Object.keys(source.options).length > 0 ? Object.keys(source.options).reduce((item, key) => ({ ...item, [`options.${key}`]: source.options[key] }), {}) : {}),
        children: source.children ? source.children.map(item => item.name) : source.children,
      };
    }
    setFormData(obj);
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
                placeholder={t('common.form.select')}
                optionFilterProp="label"
              >
                {categoryType.map((item, i) => (
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
                placeholder={t('common.form.text')}
              />
            </FormItemStyled>
          </FormCol>
        </Form2Col>
        {['daily', 'organicWine'].includes(formData.type) && (
          <>
            <FormCol>
              {['daily', 'organicWine'].includes(formData.type) && formData.options.info && (
                <FormItemStyled
                  label={t('common.words.info')}
                  name="options.info"
                  required
                  rules={rule.text}
                >
                  <InputStyled
                    placeholder={t('common.form.text')}
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
                    placeholder={t('common.form.text')}
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
                      placeholder={t('common.form.floatExample')}
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
                placeholder={t('common.form.select')}
              >
                {formData.children.map((str, i) => (
                  <OptionStyled key={`_group_${i + 1}`} value={str}>{str}</OptionStyled>
                ))}
              </SelectStyled>
            </FormItemStyled>
          </FormCol>
        )}
        <ControlWrapper>
          <Control
            loading={loading}
            onClick={handleDelete}
          >
            <TrashSvg />
          </Control>
          {isChange ? (
            <Control
              htmlType="submit"
              loading={loading}
              disabled={!isChange}
              active
            >
              <FloppyDiskSvg />
            </Control>
          ) : (
            <Control
              loading={loading}
              onClick={onClose}
            >
              <CloseSvg />
            </Control>
          )}
          
        </ControlWrapper>
      </FormStyled>
    </CategoryFormWrapper>
  );
};
