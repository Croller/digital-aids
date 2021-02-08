import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../../template/common/Spinner';
import TopBar from '../topbar';
import Service from '../../../services/restaurants';
import A from '../../../redux/actionTypes';
import './language.scss';
import { Container, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const LangItem = props => {
  const { nativeName, ...other } = props;
  return (
    <Button className="lang-item" {...other}>
      {nativeName}
    </Button>
  );
};

class LanguageSelector extends React.Component {
    state ={
      selected: false,
    }

    // componentDidMount(){
    //     this.fetchData()
    // }
    
    // componentDidUpdate( prevProps ){
    //     if( prevProps.language !== this.props.language 
    //         || this.props.match.slug !== prevProps.match.slug ){
    //         this.fetchData()
    //     }
    // }

    // async fetchData(){
    //     console.log("Fetching data")
    //     const {slug} = this.props.match.params
    //     const {language} = this.props
    // }

    selectLanguage = language => {
      console.debug(' Selecting:', language);
      const { lang } = this.props;
      lang(language);  
      this.setState({ selected: true });      
      this.props.setOverlay({ overlay: null, slug: this.props.slug });
      this.props.langSelected();
    }

    render() {
      console.debug('Lang props', this.props);
      const { selected } = this.state;
      const { restaurant, slug } = this.props;
        
      if (!restaurant) return <Spinner />;

      // can send back link via props, fallback to menu
      const back = this.props.location && this.props.location.state ? this.props.location.state.back : `/${restaurant.slug}`;
        
      console.debug('Back:', back, this.props);

      if (selected) 
      // if( this.props.history ){
      //     console.debug("history exists, going back")
      //     this.props.history.goBack()
      // }else
      { return <Redirect to={back} />; }
        
      return (
        <div className="language-selector">
          <Container>
            <div className="panel lang-list">
              {restaurant.languages.map(l => <LangItem {...l} onClick={() => this.selectLanguage(l.id)} />)}
            </div>
          </Container>
        </div>
      );
    }
}

export default connect(
  state => ({ ...state.app }),
  dispatch => ({
    lang: payload => dispatch({ type: A.SET_LANGUAGE, payload }),
    langSelected: () => dispatch({ type: A.SET_LANGUAGE_SELECTED }),
    setOverlay: payload => dispatch({ type: A.SET_OVERLAY, payload }),
  }),
)(LanguageSelector);
