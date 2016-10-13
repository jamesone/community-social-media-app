import styles from './styles';
// import React, {Text, Component,View, TouchableOpacity, } from 'react-native'
import React from 'react';
import { TouchableOpacity,  View, Text,} from 'react-native';

import SliderComponent from '@components/Slider/SliderComponent'
import SliderItem from '@components/Slider/SliderItem'
import Button from '@components/Button/Button'
const orderTypes = [
  {id: 'chronological', label: 'Chronological'},
  {id: 'likes', label: 'Likes'},
];


class FilterMenuComponent extends React.Component {
  static displayName = 'FilterMenuComponent';
  static propTypes = {
    'category': React.PropTypes.object,
    'filter': React.PropTypes.object,

  };
  static defaultProps = {
    'category': {
      categories: [],
    },
    'filter': {},
  };

  constructor (props) {
    super(props);
    this.state = {
      data: [],
      isGeo: this.props.isGeo,
    }
  }
  _setSliderId (id) {

  }

  componentWillMount () {
    const {category,} = this.props;

    const data = category.categories.map ( (cat) => {
      return {
        id: cat.typeId,
        label: cat.name,
      }
    });
    this.setState ({data: data});
  }

  _setGeo () {
    const isGeo = !this.state.isGeo;
    this.setState ({ isGeo: isGeo });
    this.props._addGeo(isGeo);
  }

  render () {
    const {_onPress, label, color, marginTop, filterIds, orderByIds,
          marginBottom, marginRight, marginLeft,
           _addFilterId, _addGeo, _addOrderBy,} = this.props;
    const {data, isGeo,} = this.state
    return (
    <View style={styles.menuContainer}>
      <View style={styles.sliderTitle}><Text>Post types: </Text></View>
       <SliderComponent data={data}
          idArray={filterIds}
          _onPress={ (id) => _addFilterId(id) }
          isDisabled={isGeo}
        />
        <View style={styles.sliderTitle}><Text>Order by: </Text></View>
        <SliderComponent
          data={orderTypes}
          idArray={orderByIds}
          _onPress={ (order) => _addOrderBy(order) }
        />
        <View style={styles.sliderTitle}><Text>Search around you: </Text></View>
        <View style={{flex: 1, alignItems: 'flex-start', margin: 5, paddingLeft: 5}}>
          <SliderItem
            label="Geo Search"
            id={1}
            // idArray={filter.chosenIds}
            isChecked={isGeo}
            // isSingle={true}
            _onPress={ () =>  this._setGeo()}
          />
        </View>
       {/*} <SliderComponent
          data={{id: 1, label: 'Geo search'}}
          // idArray={filter.chosenIds}
          isChecked={isGeo}
          _onPress={ () =>  this._setGeo()}
        />*/}


      <Button label="Save" _onPress={ () => _onPress()} />
    </View>
    )
  }
}

export default FilterMenuComponent;
