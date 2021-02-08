import React from 'react';
import DefaultComponent, { connect } from '../../DefaultComponent';
import ErrorLoading from '../../template/common/error-loading';
import Spinner from '../../template/common/Spinner';
import MenuBody from './MenuBody';
import './menu.scss';

/**
 * This is a carousel slider version of menu.
 * It was opted out due to cross-browser buggy behavior.
 */
class Menu extends DefaultComponent {
    state = {
      ...super.state,
      menu: null,
    }

    constructor(props) {
      super(props);

      this.setTranslations([
        'Allergens', 'YourOpinionIs',
      ], () => this.setState({ translationLoaded: true }));
    }

    componentDidMount() {
      super.componentDidMount();

      this.selectMenu(this.props.menu);
    }

    componentDidUpdate(prevProps) {
      super.componentDidUpdate(prevProps);

      // if( prevProps.language !== this.props.language ){
      //     this.setState({translationLoaded: false });
      //     super.fetchTranslations();
      // }

      if (prevProps.menu !== this.props.menu || prevProps.restaurant !== this.props.restaurant) {
        this.selectMenu(this.props.menu);
      }
    }

    selectMenu(menu_id = 1) {
      menu_id = parseInt(menu_id);
      console.debug('selectMenu: finding', menu_id, 'in', this.props.restaurant);

      const menu = this.props.restaurant ? this.props.restaurant.menus.find(m => m.menuid === menu_id) : false;

      this.setState({ menu });
    }

    render() {
      const { restState, language, restaurant } = this.props;
      const { menu, category, translationLoaded } = this.state;
        
      console.debug('Menu index: menu:', menu, 'translationLoaded:', translationLoaded);
      if (!translationLoaded) return <Spinner />;

      if (!menu) {
        return menu === false ? <ErrorLoading /> : <Spinner />;
      }

      return (
        <MenuBody {...{
          menu, language, restState, restaurant, category, 
        }}
        />
      );
    }
}

export default connect(Menu);
