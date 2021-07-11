import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { update, loadTables } from 'client/store/backOffice';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import { dateTimeFormat, getDateTime } from 'client/utils/common';
import { AccountForm } from 'client/ui/modules/BackOffice/components/AccountForm';
import {
  EditSvg,
  ArchiveSvg,
  UserCircleSvg,
  CheckCircleSvg,
  CircleSvg,
  PlusSvg,
} from 'client/assets/images';
import {
  UsersWrapper,
  LoaderStyled,
  Header,
  Title,
  Container,
  TableStyled,
  Confirmed,
  Contacts, Item,
  Controls, Control,
} from './styled';

const Users = () => {
  const history = useHistory();
  const rootDispatch = useDispatch();
  const params = useParams();
  const { user: { info: { language }, roles }, backOffice } = useSelector(s => s);
  const { users, loading } = backOffice;
  const [t] = useTranslation();
  const [event, setEvent] = useState(null);
  const [tableData, setTableData] = useState({
    columns: null,
    dataSource: null,
    pagination: ['bottomCenter'],
    expandedRowRender: null,
  });
  const [showConfirm, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t('backOffice.confirmModal.user.archive')}
      textOk={t('common.words.yes')}
      textCancel={t('common.words.cancel')}
      onClose={handleCancel}
      onCancel={handleCancel}
      onOk={() => handleConfirm(event.key, event.params)}
    />
  ), [event]);

  const handleOnControls = (user, key = 'edit') => {
    if (key === 'archive') {
      showConfirm();
      setEvent({ event: key, params: { ...user, is_archived: !user.is_archived } });
      return;
    }
    if (key === 'restore') {
      rootDispatch(update({ name: 'data_users', data: { ...user, is_archived: !user.is_archived } }));
    }
    history.push(`users/${user.id}`);
  };

  const handleConfirm = () => {
    rootDispatch(update({ name: 'data_users', data: event.params }));
    handleCancel();
  };

  const handleCancel = () => {
    setEvent(null);
    hideConfirm();
  };

  const handleSubmit = (obj) => {
    rootDispatch(update(obj));
    history.goBack();
  };

  useEffect(() => {
    window.prerenderReady = true;
    rootDispatch(loadTables({ names: ['data_users', 'data_roles'] }));
  }, []);

  useEffect(() => {
    if (users) {
      const columns = [
        'words.user',
        'empty.0',
        'words.info',
        'dataBase.data_users.enter_at',
        'empty.1',
      ].map(key => ({
        title: !key.includes('empty') ? t(`common.${key}`) : '',
        dataIndex: key,
        key: key.split('.').splice(-1),
      }));
      const dataSource = users.map((user, u) => ({
        key: u + 1,
        'words.user': `${user.surname || ''}${user.name ? ` ${user.name[0].toUpperCase()}.` : ''}${user.middlename ? ` ${user.middlename[0].toUpperCase()}.` : ''}`,
        'empty.0': (
          <Confirmed>
            {user.is_confirmed ? (<CheckCircleSvg />) : (<CircleSvg />)}
          </Confirmed>
        ),
        'words.info': (
          <Contacts>
            <Item>{user.phone || ''}</Item>
            <Item>{user.email || ''}</Item>
          </Contacts>
        ),
        'dataBase.data_users.enter_at': getDateTime(user.enter_at, dateTimeFormat.dateTime),
        'empty.1': user.login !== process.env.BACK_OFFICE_ADMIN_LOGIN && (
          <Controls>
            <Tooltip placement="top" title={t('common.words.edit')}>
              <Control
                disabled={!loading}
                onClick={() => handleOnControls(user)}
              >
                <EditSvg />
              </Control>
            </Tooltip>
            <Tooltip placement="top" title={t('common.words.archived')}>
              <Control
                disabled={!loading}
                onClick={() => handleOnControls(user, user.is_archived ? 'restore' : 'archive')}
              >
                {user.is_archived ? <PlusSvg /> : <ArchiveSvg />}
              </Control>
            </Tooltip>
          </Controls>
        ),
      }));
      setTableData({ columns, dataSource });
    }
  }, [users, language]);

  return (
    <UsersWrapper>
      <Header>
        <Title
          icon={<UserCircleSvg />}
          text={t('common.words.users')}
        />
      </Header>
      <Container>
        {loading && (<LoaderStyled />)}
        {!params.users ? (
          <TableStyled {...tableData} />
        ) : (
          <AccountForm
            source={users.find(f => f.id === params.users)}
            roles={roles}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}
      </Container>
    </UsersWrapper>
  );
};

export default Users;
