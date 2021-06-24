import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loadTables } from 'client/store/backOffice';
import * as moment from 'moment';
import {
  UserCircleSvg,
} from 'client/assets/images';
import {
  UsersWrapper,
  Header,
  Title,
  Container,
  TableStyled,
  TagStyled,
} from './styled';

const Users = () => {
  const [t] = useTranslation();
  const rootDispatch = useDispatch();
  const { users, roles } = useSelector(s => s.backOffice);
  const [tableData, setTableData] = useState({ columns: null, dataSource: null });

  useEffect(() => {
    window.prerenderReady = true;
    rootDispatch(loadTables({ names: ['data_users', 'data_roles'] }));
  }, []);

  useEffect(() => {
    if (users) {
      const columns = ['fio', 'info', 'roles', 'is_confirmed', 'actions'].map(key => ({
        title: t(`common.words.${key}`),
        dataIndex: key,
        key,
      }));
      const dataSource = users.map((user, u) => ({
        key: u + 1,
        fio: `${user.surname}${user.name ? ` ${user.name[0].toUpperCase()}.` : ''}${user.middlename ? ` ${user.middlename[0].toUpperCase()}.` : ''}`,
        info: (
          <>
            {user.phone} 
            <br /> 
            {moment(user.birthdate).isValid() ? moment(user.birthdate).format('DD.MM.YYYY') : null}
          </>
        ),
        roles: (
          <>
            {/* {user.birthdate} 
            <br /> 
            {user.phone}  */}
          </>
        ),
        is_confirmed: user.is_confirmed ? 1 : 0,
        actions: 'test',
      }));
      setTableData({ columns, dataSource });
    }
  }, [users]);

  return (
    <UsersWrapper>
      <Header>
        <Title
          icon={<UserCircleSvg />}
          text={t('common.words.users')}
        />
      </Header>
      <Container>
        <TableStyled {...tableData} />
      </Container>
    </UsersWrapper>
  );
};

export default Users;
