import React from 'react';
import { connect } from 'react-redux';
import A from '../../redux/actionTypes';
import Modal from './index';

class ReduxModal extends React.Component {
  render() {
    const { onClose, modalContents, showModal } = this.props;
    return (<Modal open={showModal} children={modalContents} onClose={onClose} />);
  }
}

const mapStateToProps = (state) => {
  const { showModal, modalContents } = state;
  return { showModal, modalContents };
};

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch({ type: A.HIDE_MODAL }),                
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxModal);
