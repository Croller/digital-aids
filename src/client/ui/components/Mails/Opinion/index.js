/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { getDictionaryItem, getUrl } from 'client/utils/common';
import { useTranslation } from 'react-i18next';

// const RATE = [
//   'service',
//   'meal',
//   'covid',
//   'menu',
// ];

const RATING = [
  {
    key: 'love',
    value: 4,
    icon: '😍',
  },
  {
    key: 'satisfied',
    value: 3,
    icon: '😊',
  },
  {
    key: 'disappointed',
    value: 2,
    icon: '😟',
  },
  {
    key: 'angry',
    value: 1,
    icon: '😡',
  },
];

export const OpinionMail = ({
  rating = null,
  comments = null,
}) => {
  const [t] = useTranslation();
  return rating && (
    <div style={{ display: 'block', padding: '27px 30px', width: '600px' }}>
      <table style={{ marginBottom: '33px', padding: '0' }}>
        <tbody>
          <tr>
            <td style={{ width: '75%' }}>
              <a
                href={getUrl()}
                style={{
                  width: '185px',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <img src={`${getUrl()}/static/mail/logo-dc.png`} alt="logo" style={{ height: '32px' }} />
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '90px',
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  fontSize: '12px',
                  color: '#219653',
                  zIndex: '3',
                  width: '100%',
                  textAlign: 'right',
                }}
                >
                  {t('restaurant.pageOpinion.mail.logo')}
                </span>
              </a>
            </td>
            <td>
              <h3 style={{
                fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                fontSize: '14px',
                color: '#219653',
                margin: '0',
              }}
              >
                {t('restaurant.pageOpinion.mail.title')}
              </h3>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td style={{ width: '264px' }}>
              <div
                style={{
                  width: '264px',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: '45%',
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  boxShadow: '0px 1px 14px rgba(0, 0, 0, 0.09)',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  marginBottom: '12px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '14px',
                    margin: '0',
                    marginTop: '21px',
                    marginBottom: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('restaurant.pageOpinion.rate.service')}
                </h3>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '52px',
                    margin: '0',
                    padding: '0',
                    marginBottom: '4px',
                    top: '-12px',
                    height: '58px',
                    position: 'relative',
                  }}
                >
                  {getDictionaryItem(rating.service, 'key', RATING, 'icon')}
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: '0',
                    padding: '0',
                    top: '-12px',
                    position: 'relative',
                  }}
                >
                  {t(`restaurant.pageOpinion.rating.${rating.service}`)}
                </p>
              </div>
            </td>
            <td style={{ width: '12px' }} />
            <td style={{ width: '264px' }}>
              <div
                style={{
                  width: '264px',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: '45%',
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  boxShadow: '0px 1px 14px rgba(0, 0, 0, 0.09)',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  marginBottom: '12px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '14px',
                    margin: '0',
                    marginTop: '21px',
                    marginBottom: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('restaurant.pageOpinion.rate.meal')}
                </h3>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '52px',
                    margin: '0',
                    padding: '0',
                    marginBottom: '4px',
                    top: '-12px',
                    height: '58px',
                    position: 'relative',
                  }}
                >
                  {getDictionaryItem(rating.meal, 'key', RATING, 'icon')}
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: '0',
                    padding: '0',
                    top: '-12px',
                    position: 'relative',
                  }}
                >
                  {t(`restaurant.pageOpinion.rating.${rating.meal}`)}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ marginBottom: '12px', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '264px' }}>
              <div
                style={{
                  width: '264px',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: '45%',
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  boxShadow: '0px 1px 14px rgba(0, 0, 0, 0.09)',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  marginBottom: '12px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '14px',
                    margin: '0',
                    marginTop: '21px',
                    marginBottom: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('restaurant.pageOpinion.rate.covid')}
                </h3>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '52px',
                    margin: '0',
                    padding: '0',
                    marginBottom: '4px',
                    top: '-12px',
                    height: '58px',
                    position: 'relative',
                  }}
                >
                  {getDictionaryItem(rating.covid, 'key', RATING, 'icon')}
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: '0',
                    padding: '0',
                    top: '-12px',
                    position: 'relative',
                  }}
                >
                  {t(`restaurant.pageOpinion.rating.${rating.covid}`)}
                </p>
              </div>
            </td>
            <td style={{ width: '12px' }} />
            <td style={{ width: '264px' }}>
              <div
                style={{
                  width: '264px',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: '45%',
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  boxShadow: '0px 1px 14px rgba(0, 0, 0, 0.09)',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  marginBottom: '12px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '14px',
                    margin: '0',
                    marginTop: '21px',
                    marginBottom: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('restaurant.pageOpinion.rate.menu')}
                </h3>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '52px',
                    margin: '0',
                    padding: '0',
                    marginBottom: '4px',
                    top: '-12px',
                    height: '58px',
                    position: 'relative',
                  }}
                >
                  {getDictionaryItem(rating.menu, 'key', RATING, 'icon')}
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: '0',
                    padding: '0',
                    top: '-12px',
                    position: 'relative',
                  }}
                >
                  {t(`restaurant.pageOpinion.rating.${rating.menu}`)}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ marginBottom: '12px', width: '100%' }}>
        <tbody>
          <tr>
            <td>
              <h3
                style={{
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  fontSize: '14px',
                  margin: '0',
                  marginBottom: '23px',
                  textTransform: 'uppercase',
                }}
              >
                {t('restaurant.pageOpinion.mail.comments')}
              </h3>
            </td>
          </tr>
          <tr>
            <td>
              <p
                style={{
                  width: '100%',
                  padding: '22px 31px 22px 20px',
                  backgroundColor: '#F4F4F4',
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  fontSize: '14px',
                  marginBottom: '55px',
                }}
              >
                {comments}
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center', width: '100%' }}>
              <span
                style={{
                  width: '100%',
                  fontFamily: 'Montserrat, Source Sans Pro, Helvetica, sans-serif',
                  fontSize: '20px',
                  marginBottom: '51px',
                  textAlign: 'center',
                }}
              >
                {t('restaurant.pageOpinion.mail.footer')}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

