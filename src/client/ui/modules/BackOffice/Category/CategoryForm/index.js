import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { rules, collectError } from 'client/utils/validatorRules';
import { showMessage } from 'client/ui/components/_ui/Message';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import { getDictionaryItem } from 'client/utils/common';
import {
  dataToForm,
  dataFromToList,
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
  TextAreaStyled,
  Hr,
  SelectStyled, OptionStyled,
  Controls, Control,
  Separator,
  FormRange, RadioGroup, RadioButton,
  InputMaskStyled,
  Group2Form,
  GroupForm, 
  GroupControl,
  AddGroup,
} from './styled';

export const CategoryForm = ({
  source = null,
  loading = false,
  currency = null,
  dictionary = null,
  archive = false,
  language = 'en',
  className,
  onChange = () => {},
}) => {
  const [t] = useTranslation();
  const rule = rules(t);
  const [isChange, setIsChange] = useState(false);
  const [current, setCurrent] = useState(null);
  const [formData, setFormData] = useState(null);
  const [form] = FormStyled.useForm();
  const [event, setEvent] = useState(null);
  const [showConfirm, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t(`backOffice.confirmModal.category.${event.key}`)}
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

  const setData = (obj) => {
    setFormData(obj);
    form.setFieldsValue(obj);
  };

  const handleFinish = (values) => {
    setIsChange(false);
    form.resetFields();
    if (!event) {
      onChange(dataFromToList({ ...formData, ...values }, current, language));
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
    if (!values) return;
    console.log('values - ', { ...formData, ...values });
    let edited = { ...formData, ...values };
    if (values.type) {
      const def = categoryModel.find(f => f.type === values.type);
      setCurrent({ ...current, ...def });
      edited = { ...edited, ...dataToForm(def) };
    }
    setData(edited);
    setIsChange(true);
  };

  const handleEvent = (key) => {
    const params = {};

    if (key === 'restore') params.is_archived = false;
    if (key === 'delete') params.is_deleted = true;
    if (key === 'archive') params.is_archived = true;

    showConfirm();
    let obj = current;
    obj = {
      ...obj,
      ...params,
      children: obj.children ? obj.children.map(item => ({ ...item, ...params })) : null,
    };
    setEvent({ key, params: obj });
  };

  const handleChange = (key = null, params = null) => {
    if (!key) return;
    let obj = null;
    if (key !== 'close') {
      obj = dataFromToList({ ...formData, ...(params || {}) }, current, language);
    }
    onChange(obj);
    setFormData(null);
  };

  const handleEventGroup = (key, index) => {
    setIsChange(true);
    if (key === 'new') {
      setCurrent({ ...current, children: [...current.children, categoryModel[0]] });
      setData({ ...formData, [`children.${current.children.length}.name`]: '' });
    }
    if (key === 'delete') {
      const edited = current.children.map((child, i) => {
        if (i === index) {
          return { ...child, is_deleted: true };
        }
        return child;
      });
      setCurrent({ ...current, children: edited });
    } 
  };

  useEffect(() => {
    const obj = source || categoryModel[0];
    setCurrent(obj);
    setData(dataToForm(obj));
    return () => {
      form.resetFields();
    };
  }, [source]);

  return current && (
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
                onClick={() => form.submit()}
                disabled={!isChange || loading}
                active
              >
                <FloppyDiskSvg />
              </Control>
            </Tooltip>
          )}
          {current.id && (
            <>
              {!archive && !isChange && (
                <Tooltip placement="top" title={t('common.words.archive')}>
                  <Control
                    disabled={loading}
                    onClick={() => handleEvent('archive')}
                  >
                    <ArchiveSvg />
                  </Control>
                </Tooltip>
              )}
              {archive && current.is_archived && (
                <>
                  <Tooltip placement="top" title={t('common.words.restore')}>
                    <Control
                      disabled={loading}
                      onClick={() => handleEvent('restore')}
                    >
                      <PlusSvg />
                    </Control>
                  </Tooltip>
                  <Tooltip placement="top" title={t('common.words.delete')}>
                    <Control
                      disabled={loading}
                      onClick={() => handleEvent('delete')}
                    >
                      <TrashSvg />
                    </Control>
                  </Tooltip>
                </>
              )}
            </>
          )}
          <Tooltip placement="top" title={t('common.words.close')}>
            <Control
              disabled={loading}
              onClick={() => handleChange('close')}
            >
              <CloseSvg />
            </Control>
          </Tooltip>
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
                disabled={archive || language !== 'en' || (current && current.id)}
              >
                {categoryModel.filter(f => !['specialDeals', 'foodtips'].includes(f.type)).map((item, i) => (
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
                disabled={archive}
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
          </FormCol>
        </Form2Col>
        {['daily', 'organicWine'].includes(formData.type) && (
          <FormCol>
            <Form2Col>
              <FormCol>
                <FormItemStyled
                  label={t('common.words.info')}
                  name="options.info"
                  required
                  rules={rule.text}
                >
                  <TextAreaStyled
                    minRows={1}
                    placeholder={t('common.form.placeholder.text')}
                    disabled={archive}
                  />
                </FormItemStyled>
              </FormCol>
              <FormCol>
                <FormItemStyled
                  label={t('common.words.price')}
                  name="options.price"
                  required
                >
                  <InputStyled
                    type="number"
                    step="0.01"
                    addonAfter={dictionary && getDictionaryItem(currency, 'id', dictionary.currency, 'symbol')}
                    placeholder={t('common.form.placeholder.floatExample')}
                    disabled={archive}
                  />
                </FormItemStyled>
              </FormCol>
            </Form2Col>
            <Form2Col>
              <FormCol>
                <FormItemStyled
                  label={t('common.words.description')}
                  name="options.description"
                  required
                  rules={rule.text}
                >
                  <TextAreaStyled
                    placeholder={t('common.form.placeholder.text')}
                    disabled={archive}
                  />
                </FormItemStyled>
              </FormCol>
              <FormCol>
                <FormItemStyled
                  label={t('common.words.workingTime')}
                >
                  <FormItemStyled
                    marginbottom={0}
                    name="options.at_work.day"
                  >
                    <RadioGroup>
                      {dictionary.days.map(({ id, name }) => (
                        <RadioButton key={id} value={id}>{name}</RadioButton>
                      ))}
                    </RadioGroup>
                  </FormItemStyled>
                  <FormRange>
                    <FormItemStyled
                      name={`options.at_work.${formData['options.at_work.day']}.from`}
                    >
                      <InputMaskStyled
                        mask="11:11"
                        disabled={archive || language !== 'en'}
                      />
                    </FormItemStyled>
                    <Separator>
                      -
                    </Separator>
                    <FormItemStyled
                      name={`options.at_work.${formData['options.at_work.day']}.to`}
                    >
                      <InputMaskStyled
                        mask="11:11"
                        disabled={archive || language !== 'en'}
                      />
                    </FormItemStyled>
                  </FormRange>
                </FormItemStyled>
              </FormCol>
            </Form2Col>
          </FormCol>
        )}
        {current.children && (
          <FormCol>
            <Hr />
            <FormItemStyled
              label={t('common.words.group')}
            >
              <Group2Form>
                {Object.keys(formData).filter(f => {
                  if (f.indexOf('children.') > -1) {
                    const index = Number(f.replace('children.', '').replace('.name', ''));
                    const item = current.children[index];
                    return !!(item && !item.is_deleted);
                  }
                  return false;
                }).map((item) => {
                  const index = Number(item.replace('children.', '').replace('.name', ''));
                  return (
                    <GroupForm key={`_group_control_${index}`}>
                      <FormItemStyled
                        name={`children.${index}.name`}
                        required
                        rules={rule.text}
                      >
                        <InputStyled
                          placeholder={t('common.form.placeholder.text')}
                          disabled={archive}
                        />
                      </FormItemStyled>
                      <GroupControl>
                        <Tooltip placement="top" title={t('common.words.delete')}>
                          <Control
                            disabled={loading || archive}
                            onClick={() => handleEventGroup('delete', index)}
                          >
                            <TrashSvg />
                          </Control>
                        </Tooltip>
                      </GroupControl>
                    </GroupForm>
                  );
                })}
              </Group2Form>
            </FormItemStyled>
            {!archive && (
              <AddGroup
                disabled={Object.keys(formData).some(f => f.indexOf('children.') > -1 && !formData[f])}
                onClick={() => handleEventGroup('new')}
              >
                {t('common.words.newGroup')}
                <PlusSvg />
              </AddGroup>
            )}
          </FormCol>
        )}
      </FormStyled>
    </CategoryFormWrapper>
  );
};
