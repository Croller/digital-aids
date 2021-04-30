import React, { memo, useState, useEffect } from 'react';
import { showMessage } from 'client/ui/components/_ui/Message';
import { getUrl, getDictionaryItem, loadFile } from 'client/utils/common';
import { rules, collectError } from 'client/utils/validatorRules';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import { dataToForm, dataToApi, model } from 'client/store/backOffice/mapper/dish';
import { ALLERGENS } from 'client/ui/components/_block/Allergens/constants';
import {
  ArchiveSvg,
  CloseSvg,
  FloppyDiskSvg,
  TrashSvg,
  PlusSvg,
} from 'client/assets/images';
import {
  DishFormWrapper,
  FormStyled,
  Col,
  Form2Col, 
  FormCol,
  FormItemStyled,
  InputStyled, 
  Hr,
  SelectStyled, OptionStyled,
  UploaderImage,
  Controls, Control,
  Img, Text,
} from './styled';

export const DishForm = memo(({
  dish = null,
  group = null,
  loading = false,
  dictionary = null,
  currency = null,
  archive = false,
  className,
  onChange = () => {},
}) => {
  const [t] = useTranslation();
  const rule = rules(t);
  const [formData, setFormData] = useState(null);
  const [deletedFiles, setDeletedFiles] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [loadFiles, setLoadFiles] = useState(true);
  const [event, setEvent] = useState(null);
  const [form] = FormStyled.useForm();
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

  const initValue = () => {
    const data = { ...(dish || model) };

    setFormData(dataToForm({
      ...data,
      group: group ? group.map(item => item.name) : null,
    }));
    if (data.images && data.images.length > 0) {
      Promise.all(data.images.map(async (uuid) => {
        const file = await loadFile(`${getUrl()}/static/restaurants/dishes/${uuid}.png`, uuid);
        return file;
      })).then(images => setFormData(dataToForm({ ...data, images })));
    }
    setLoadFiles(false);
  };

  const handleUpload = (files, deleted = null) => {
    const list = [...files];
    if (deleted && list.some(s => s && s.uuid === deleted.uuid)) {
      setDeletedFiles([...(deletedFiles || []), `/restaurants/dishes/${deleted.uuid}.png`]);
    }
    setFormData({ ...formData, images: [...list] });
    setIsChange(true);
  };

  const handleFinish = (values) => {
    setIsChange(false);
    onChange(dataToApi({
      ...formData,
      ...values,
    }));
  };

  const handleFinishFailed = ({ errorFields }) => {
    collectError(errorFields);
    showMessage({
      type: 'error',
      content: t('common.form.error.notFilled'),
    });
  };

  const handleValuesChange = (values) => {
    console.log('values - ', values);
    setFormData({
      ...formData,
      ...values,
    });
    setIsChange(true);
  };

  const handleEvent = (key) => {
    const params = {};

    if (key === 'restore') params.is_archived = false;
    if (key === 'delete') params.is_deleted = true;
    if (key === 'archive') params.is_archived = true;

    showConfirm();
    setEvent({ key, params: { ...formData } });
  };

  const handleChange = (key = null, params = null) => {
    if (!key) return;
    let obj = null;

    if (key !== 'close') {
      obj = { ...formData, ...(params || {}) };
    }
    onChange(obj);
    setFormData(null);
  };

  useEffect(() => {
    initValue();

    return () => {
      form.resetFields();
    };
  }, [dish]);

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
          {!archive && !isChange && dish && dish.id && (
            <Tooltip placement="top" title={t('common.words.archive')}>
              <Control
                loading={loading}
                onClick={() => handleEvent('archive')}
              >
                <ArchiveSvg />
              </Control>
            </Tooltip>
          )}
          {archive && dish ? (
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
          <Col>
            {!loadFiles && (
              <UploaderImage
                files={formData.images}
                onUpload={handleUpload}
                onStatus={showMessage}
                max={1}
              />
            )}
          </Col>
          <Col>
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
            <FormItemStyled
              label={t('common.words.description')}
              name="description"
              required
              rules={rule.text}
            >
              <InputStyled
                placeholder={t('common.form.placeholder.text')}
              />
            </FormItemStyled>
            <Hr />
            <Form2Col>
              <FormItemStyled
                label={t('common.words.weight')}
                name="price[0].amount"
                required
                rules={rule.text}
              >
                <InputStyled
                  className="addon-select"
                  type="number"
                  step="0.01"
                  placeholder={t('common.form.placeholder.floatExample')}
                  addonAfter={(
                    <FormItemStyled
                      name="price[0].unit"
                      required
                      rules={rule.text}
                    >
                      <SelectStyled>
                        {dictionary && dictionary.units.map((item, i) => (
                          <OptionStyled key={`_units_${i + 1}`} value={item.id}>
                            {item.name}
                          </OptionStyled>
                        ))}
                      </SelectStyled>
                    </FormItemStyled>
                  )}
                />
              </FormItemStyled>
              <FormItemStyled
                label={t('common.words.price')}
                name="price[0].cost"
                required
                rules={rule.number}
              >
                <InputStyled
                  type="number"
                  step="0.01"
                  placeholder={t('common.form.placeholder.floatExample')}
                  addonAfter={dictionary && getDictionaryItem(currency, 'id', dictionary.currency, 'symbol')}
                />
              </FormItemStyled>
            </Form2Col>
            <FormCol>
              <FormItemStyled
                label={t('common.words.allergens')}
                name="allergens"
                required
                rules={rule.text}
              >
                <SelectStyled
                  showSearch
                  mode="multiple"
                  placeholder={t('common.form.placeholder.text')}
                  optionFilterProp="label"
                  className="select-allergen"
                >
                  {dictionary && dictionary.allergens.map(({ id, name }, i) => (
                    <OptionStyled
                      key={`_allergens_${i + 1}`}
                      value={id}
                      label={name}
                      className="options-allergen"
                    >
                      <Img src={getDictionaryItem(id, 'key', ALLERGENS, 'src')} />
                      <Text>
                        {name}
                      </Text>
                    </OptionStyled>
                  ))}
                </SelectStyled>
              </FormItemStyled>
            </FormCol>
            {group && (
              <>
                <Hr />
                <FormCol>
                  <FormItemStyled
                    label={t('common.words.group')}
                    name="group"
                    required
                    rules={rule.text}
                  >
                    <SelectStyled
                      placeholder={t('common.form.placeholder.text')}
                    >
                      {group && group.map((item, i) => (
                        <OptionStyled key={`_group_${i + 1}`} value={item.name}>{item.name}</OptionStyled>
                      ))}
                    </SelectStyled>
                  </FormItemStyled>
                </FormCol>
              </>
            )}
          </Col>
        </Form2Col>
      </FormStyled>
    </DishFormWrapper>
  );
});
