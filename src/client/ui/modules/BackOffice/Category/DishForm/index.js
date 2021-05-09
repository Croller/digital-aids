import React, { useState, useEffect } from 'react';
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
  EditSvg,
} from 'client/assets/images';
import {
  DishFormWrapper,
  FormStyled,
  Col,
  Form2Col, 
  FormCol,
  FormItemStyled,
  InputStyled, 
  TextAreaStyled,
  Hr,
  SelectStyled, OptionStyled,
  UploaderImage,
  Controls, Control,
  Img, Text,
  ViewStyled,
  ViewItemStyled,
} from './styled';

export const DishForm = ({
  source = null,
  type = null,
  dishes = null,
  categories = null,
  resaurant = null,
  controls = true,
  loading = false,
  dictionary = null,
  currency = null,
  archive = false,
  className,
  onChange = () => {},
}) => {
  console.log('categories', categories);
  const [t] = useTranslation();
  const rule = rules(t);
  const [formData, setFormData] = useState(null);
  const [deletedFiles, setDeletedFiles] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [loadFiles, setLoadFiles] = useState(true);
  const [edit, setEdit] = useState(false);
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

  const setFiledsValue = (obj = null) => {
    if (!obj) return;
    setFormData(obj);
    form.setFieldsValue(obj);
  };

  const initValue = () => {
    const data = { ...(source || model) };

    setFiledsValue(dataToForm({
      ...data,
      images: [],
      count: data.count === 0 ? (dishes ? dishes.length + 1 : 0) : data.count,
    }));
    if (data.images && data.images.length > 0) {
      Promise.all(data.images.map(async (uuid) => {
        const file = await loadFile(`${getUrl()}/static/restaurants/dishes/${uuid}.png`, uuid);
        return file;
      })).then(images => setFiledsValue(dataToForm({ ...data, images })));
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

  const handleFinish = (values = {}) => {
    const obj = {
      ...formData,
      ...values,
    };
    onChange(dataToApi(obj, categories, resaurant));
    setEdit(false);
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
    console.log('values - ', values);
    setIsChange(true);
    if (values.copyDish && formData.copyDish !== values.copyDish) {
      const { name, description, images } = dishes.find(f => f.id === values.copyDish);

      const obj = {
        ...formData,
        ...values,
        name,
        description,
        images: [],
      };
      setFiledsValue(obj);

      if (images && images.length > 0) {
        Promise.all(images.map(async (uuid) => {
          const file = await loadFile(`${getUrl()}/static/restaurants/dishes/${uuid}.png`, uuid);
          return file;
        })).then(imgs => setFiledsValue({ ...obj, images: imgs }));
      }
    }
  };

  const handleEvent = (key) => {
    const params = { id: source.id };

    if (key === 'restore') params.is_archived = false;
    if (key === 'delete') params.is_deleted = true;
    if (key === 'archive') params.is_archived = true;

    showConfirm();
    setEvent({
      key,
      params, 
    });
  };

  const handleChange = (key = null, params = null) => {
    if (!key) return;
    let obj = null;
    if (key !== 'close') {
      obj = params;
    }
    if (edit && key === 'close') {
      setEdit(false);
      setIsChange(false);

      if (source) {
        return;
      }
    }
    onChange(obj);
    setFormData(null);
  };

  const handleEdit = () => {
    form.resetFields();
    initValue();
    setEdit(true);
  };

  useEffect(() => {
    form.resetFields();
    initValue();

    if (!source) {
      setEdit(true);
    }

    return () => {
      form.resetFields();
    };
  }, [source]);

  return formData && (
    <DishFormWrapper className={className}>
      {controls && (
        <Controls>
          {isChange && (
            <>
              <Tooltip placement="top" title={t('common.words.save')}>
                <Control
                  disabled={!isChange || loading}
                  active
                  onClick={() => form.submit()}
                >
                  <FloppyDiskSvg />
                </Control>
              </Tooltip>
            </>
          )}
          {source && source.id && (
            <>
              {!archive && !isChange && (
              <>
                {!edit && (
                  <>
                    <Tooltip placement="top" title={t('common.words.edit')}>
                      <Control
                        disabled={loading}
                        onClick={handleEdit}
                      >
                        <EditSvg />
                      </Control>
                    </Tooltip>
                    <Tooltip placement="top" title={t('common.words.archive')}>
                      <Control
                        disabled={loading}
                        onClick={() => handleEvent('archive')}
                      >
                        <ArchiveSvg />
                      </Control>
                    </Tooltip>
                  </>
                )}
              </>
              )}
              {archive && (
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
          {edit && (
            <Tooltip placement="top" title={t('common.words.close')}>
              <Control
                disabled={loading}
                onClick={() => handleChange('close')}
              >
                <CloseSvg />
              </Control>
            </Tooltip>
          )}
        </Controls>
      )}
      <FormStyled
        form={form}
        layout="vertical"
        initialValues={formData}
        onFinish={handleFinish}
        onValuesChange={handleValuesChange}
        onFinishFailed={handleFinishFailed}
      >
        <Form2Col>
          <Col>
            {!loadFiles && (
              <UploaderImage
                disabled={!edit}
                files={formData.images}
                onUpload={handleUpload}
                onStatus={showMessage}
                max={1}
              />
            )}
          </Col>
          <Col>
            {!archive && edit ? (
              <>
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
                  <TextAreaStyled
                    placeholder={t('common.form.placeholder.text')}
                  />
                </FormItemStyled>
                {type === 'specialDeals' && (
                  <>
                    <FormItemStyled
                      label={t('common.words.specialPromotion')}
                      name="options.specialPromotion"
                      required
                      rules={rule.text}
                    >
                      <TextAreaStyled
                        minRows={1}
                        placeholder={t('common.form.placeholder.text')}
                      />
                    </FormItemStyled>
                    <Hr />
                    {/* <FormItemStyled
                      label={t('common.words.specialPromotion')}
                      name="options.specialPromotion"
                      required
                      rules={rule.text}
                    >
                      <TextAreaStyled
                        minRows={1}
                        placeholder={t('common.form.placeholder.text')}
                      />
                    </FormItemStyled> */}
                  </>
                )}
                {type === 'foodtips' && dishes && (
                  <FormItemStyled
                    label={t('common.words.dish')}
                    name="copyDish"
                    rules={rule.select}
                  >
                    <SelectStyled
                      showSearch
                      mode="single"
                      placeholder={t('common.form.placeholder.select')}
                      optionFilterProp="label"
                    >
                      {dishes.map((item, i) => (
                        <OptionStyled
                          key={`_copy_dish_${i + 1}`}
                          value={item.id}
                          label={item.name}
                        >
                          {item.name}
                        </OptionStyled>
                      ))}
                    </SelectStyled>
                  </FormItemStyled>
                )}
              </>
            ) : (
              <>
                <ViewStyled layout="vertical">
                  <ViewItemStyled label={t('common.words.name')}>
                    {formData.name}
                  </ViewItemStyled>
                </ViewStyled>
                <ViewStyled layout="vertical">
                  <ViewItemStyled label={t('common.words.description')}>
                    {formData.description}
                  </ViewItemStyled>
                </ViewStyled>
                {type === 'specialDeals' && (
                  <ViewStyled layout="vertical">
                    <ViewItemStyled label={t('common.words.specialPromotion')}>
                      {formData['options.specialPromotion']}
                    </ViewItemStyled>
                  </ViewStyled>
                )}
              </>
            )}
            {!['specialDeals', 'foodtips'].includes(type) && (
              <>
                {!archive && edit ? (
                  <>
                    <Hr />
                    <Form2Col>
                      <FormItemStyled
                        label={t('common.words.weight')}
                        name="price[0].amount"
                        // required
                        // rules={rule.text}
                      >
                        <InputStyled
                          className="addon-select"
                          type="number"
                          step="0.01"
                          placeholder={t('common.form.placeholder.floatExample')}
                          addonAfter={(
                            <FormItemStyled
                              name="price[0].unit"
                              // required
                              // rules={rule.text}
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
                  </>
                ) : (
                  <>
                    <Hr />
                    <ViewStyled layout="vertical">
                      <ViewItemStyled label={t('common.words.weight')}>
                        {formData['price[0].amount']}
                      </ViewItemStyled>
                      <ViewItemStyled label={t('common.words.unit')}>
                        {formData['price[0].unit']}
                      </ViewItemStyled>
                      <ViewItemStyled label={t('common.words.price')}>
                        {formData['price[0].cost']}
                      </ViewItemStyled>
                    </ViewStyled>
                  </>
                )}
                {!archive && edit ? (
                  <Form2Col>
                    <FormItemStyled
                      label={t('common.words.allergens')}
                      name="allergens"
                      required
                      rules={rule.text}
                    >
                      <SelectStyled
                        showSearch
                        mode="multiple"
                        placeholder={t('common.form.placeholder.select')}
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
                    <FormItemStyled
                      label={t('common.words.number')}
                      name="count"
                      required
                      rules={rule.in}
                    >
                      <InputStyled
                        type="number"
                        placeholder={t('common.form.placeholder.numberExample')}
                      />
                    </FormItemStyled>
                  </Form2Col>
                ) : (
                  <ViewStyled layout="vertical">
                    <ViewItemStyled label={t('common.words.allergens')}>
                      {formData.allergens.map(id => (
                        <Img
                          key={`_img_${id}`}
                          src={getDictionaryItem(id, 'key', ALLERGENS, 'src')}
                        />
                      ))}
                    </ViewItemStyled>
                    <ViewItemStyled label={t('common.words.number')}>
                      {formData.count}
                    </ViewItemStyled>
                  </ViewStyled>
                )}
                {Array.isArray(categories) && (
                <>
                  <Hr />
                  {!archive && edit ? (
                    <FormCol>
                      <FormItemStyled
                        label={t('common.words.group')}
                        name="category"
                        required
                        rules={rule.text}
                      >
                        <SelectStyled
                          showSearch
                          mode="single"
                          placeholder={t('common.form.placeholder.select')}
                          optionFilterProp="label"
                        >
                          {categories.map((item, i) => (
                            <OptionStyled
                              key={`_categories_${i + 1}`}
                              value={item.id}
                              label={item.name}
                            >
                              {item.name}
                            </OptionStyled>
                          ))}
                        </SelectStyled>
                      </FormItemStyled>
                    </FormCol>
                  ) : (
                    <ViewStyled layout="vertical">
                      <ViewItemStyled label={t('common.words.group')}>
                        {source && getDictionaryItem(source.category, 'id', categories, 'name')}
                      </ViewItemStyled>
                    </ViewStyled>
                  )}
                </>
                )}
              </>
            )}
          </Col>
        </Form2Col>
      </FormStyled>
    </DishFormWrapper>
  );
};
