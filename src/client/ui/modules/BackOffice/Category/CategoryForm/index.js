import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { categoryType } from 'client/utils/constants';
import { dataToForm, dataToApi, model } from 'client/store/backOffice/mapper/category';
import { Tooltip } from 'antd';
import {
  ArchiveSvg,
  CloseSvg,
  FloppyDiskSvg,
  TrashSvg,
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

  const setFiledsValue = (obj = null) => {
    if (!obj) return;
    setFormData(obj);
    form.setFieldsValue(obj);
  };

  const handleFinish = (values) => {
    console.log('values', values);
    setIsChange(false);
    form.resetFields();
    onChange(dataToApi(values, source));
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
      setFiledsValue({
        ...values,
        ...dataToForm(obj),
      });
    }
    setIsChange(true);
  };

  const handleChange = (key = null) => {
    if (!key) return;
    form.resetFields();
    const obj = key === 'close' ? null : { ...source, [key]: true };
    onChange(obj);
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
          {!archive ? (
            <>
              {(!source && archive) ? (
                <Tooltip placement="top" title={t('common.words.delete')}>
                  <Control
                    loading={loading}
                    onClick={() => handleChange('is_deleted')}
                  >
                    <TrashSvg />
                  </Control>
                </Tooltip>
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
            </>
          ) : (
            <Tooltip placement="top" title={t('common.words.archive')}>
              <Control
                loading={loading}
                onClick={() => handleChange('is_archived')}
              >
                <ArchiveSvg />
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
        {'children' in formData && formData.children && (
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
                {formData.children && formData.children.map((str, i) => (
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
