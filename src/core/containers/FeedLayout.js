'use strict'
import React from 'react';
import { Image, Text, TouchableOpacity,View } from 'react-native';

// Components
import FeedLayoutComponent from '../../components/Feed/FeedComponent';
import FilterMenuComponent from '@components/FilterMenu/FilterMenuComponent'
import Feed from '@components/Feed/Feed';
import Button from '@components/Button/Button';
import SliderComponent from '@components/Slider/SliderComponent'
// Actions
import * as FeedActions from '../redux/actions/FeedActions';
import * as PostActions from '../redux/actions/PostActions';
import * as FilterActions from '../redux/actions/FilterActions';
// Other
import _ from 'lodash'
import {cloudfront,} from '../../config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import feedstyles from './feed';
var Icon = require('react-native-vector-icons/MaterialIcons')

import {REFRESHING_FEED, NEXT_URL_FEED, NORMAL_FEED,NEXT_URL_USER,NORMAL_USER_FEED,} from '@core/constants/ApiConstants';

class MultiFeedLayout extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      next: '',
      normal: '',
      feedType: 'home', // #TODO implement user feed
      userProfile: {},

      // Filter stuff
      hideFilter: true, // Toggle filter dropdown
      isGeo: false, // If true, grab coords and pass to api
      filterIds: this.props.filter.chosenIds ? this.props.filter.chosenIds : [], // E.g [1, 2, 6]
      orderByIds: this.props.filter.orderBy ? this.props.filter.orderBy : [], // e.g [chronological, likes]
    }
  }

  componentWillMount() {
    let normal, next = "";
    console.log ("POOOOO LOL")
    const {FeedActions, feedType, feedUser, sceneKey,} = this.props;
    // console.log (this.props, "<~~~~~LOL")
    console.log (this.props.sceneKey, "<HI")
    if (sceneKey == 'userFeed' || sceneKey == 'profile') {
      var idToSet = null;
      if (this.props.sceneKey == 'profile') idToSet = this.props.user.userId;
      else idToSet = feedUser.userId;
      this.setState({userProfile: sceneKey == 'profile' ? this.props.user : feedUser});
      console.log (idToSet, "<! SETTING MUTHER FUCKING ID")
      FeedActions.setUserId (idToSet);
    }
    // else {
    //   FeedActions.setFeedType('home');
    // }
    // console.log ("\n\n\nFEED TYPE: ", feedType)
    // if (feedType == 'user') {
    //   FeedActions.setFeedType('user');
    //   FeedActions.setUserId (feedUser.userId);
    // } else {
    //   FeedActions.setFeedType ('home');
    // }


    this.setState({
      normal: NORMAL_FEED,
      next: NEXT_URL_FEED,
    });
    this._fetchFeed(NORMAL_FEED);
  }

  componentWillReceiveProps (nextProps) {
    // const {sceneKey, feedUser,} = nextProps;
    //  if (sceneKey == 'userFeed' || sceneKey == 'profile') {
    //   var idToSet = null;
    //   if (sceneKey == 'profile') idToSet = nextProps.user.userId;
    //   else idToSet = feedUser.userId;
    //   this.setState({userProfile: sceneKey == 'profile' ? nextProps.user : feedUser});
    //   console.log (idToSet, "<! SETTING MUTHER FUCKING ID")
    //   FeedActions.setUserId (idToSet);
    // } else {
    //   FeedActions.setUserId (null);
    // }
    console.log ("POOOOO")
  }

  componentWillUpdate (nxtP, nxtS) {
    if (nxtP.sceneKey != this.props.sceneKey) {
      const {sceneKey, feedUser,} = nextProps;
       if (sceneKey == 'userFeed' || sceneKey == 'profile') {
        var idToSet = null;
        if (sceneKey == 'profile') idToSet = nextProps.user.userId;
        else idToSet = feedUser.userId;
        this.setState({userProfile: sceneKey == 'profile' ? nextProps.user : feedUser});
        console.log (idToSet, "<! SETTING MUTHER FUCKING ID")
        FeedActions.setUserId (idToSet);
      } else {
        FeedActions.setUserId (null);
      }
    }
    // console.log (nxtP, "<~~~ NXT PROPS");
    // console.log (this.props, "<~~~ THIS . PROPS");
    // if (this.props.sceneKey != nxtP.sceneKey) {
    //   if (nxtP.sceneKey == 'feed') {
    //     nxtP.FeedActions.setFeedType('home');
    //   }
    // }
    // if (this.props.feedType == "user") {
    //   console.log ("LAST TYPE WAS FEED <!!~~~")
    //   // nxtP.FeedActions.setFeedType('home');
    // }
  }

  // On BUtton click, set chosen Ids to refresh feed
  _updateFeed () {
    let {filterIds, isGeo, orderByIds, normal,} = this.state;
    this.props.FilterActions.setChosenIds (filterIds);
    this.props.FilterActions.setGeo ({isGeo: isGeo, radius: 10});
    this.props.FilterActions.setOrder(orderByIds);


    if (isGeo) {
      this._grabCoords();
      console.log("coord fetch");
    } else {
      this._fetchFeed(normal)
      console.log("normal fetch");
    }

    this.setState ({
      hideFilter: true,
    });

  }

  _addGeo (isGeo) {
    console.log ("making geo", isGeo)
    // Here I would grab coords and make call
    this.setState ({
      isGeo: isGeo
    });
  }

  // Add a filterId to an array.
  _addFilterId (data) {
    let {filterIds, } = this.state;
    if (filterIds.indexOf(data.id) > -1) {
      // filterIds.filter(id => id != data.chosenId);
      filterIds.splice(filterIds.indexOf(data.id), 1);
    } else {
      filterIds.push(data.id);
    }

    console.log (filterIds, "xoxoxo");
    this.setState ({filterIds: filterIds});
  }

  _addOrderBy (order) {
    console.log(order, "<~~ ORDER")
    let {orderByIds, } = this.state;

    if (orderByIds.indexOf(order.id) > -1) {
      orderByIds.splice(orderByIds.indexOf(order.id), 1); // Remove id by it's index
    } else {
      orderByIds.push(order.id);
    }

    this.setState ({orderByIds: orderByIds});

  }

  render() {
    const {userProfile,} = this.state;

    // const feedType = this.props.feedType == "user" ? "user" : "home";
    const feedType = this.props.sceneKey == "feed" ? "home" : "userFeed";
    const user = this.props.user ? this.props.user : null;
    const shouldRefresh = this.props.shouldRefresh ? true : false;
    const posts = feedType == 'userFeed'
                  ? this.props.feed.userPosts
                  : this.props.feed.posts;

    return (
        <View style={{flex: 1, }}>
        {(feedType != "userFeed") &&
        <View style={feedstyles.feedMenuWrapper}>
          <TouchableOpacity
            onPress={ () => {
              this.setState({hideFilter: !this.state.hideFilter})
            }}
          >
            <Text style={{color: 'black',}}>
              <Icon
                name={this.state.hideFilter ? "expand-more" : "expand-less"} size={25}
              />
            </Text>
          </TouchableOpacity>

        </View>
        }
        {(feedType == "userFeed") &&
        // MOVE THIS TO OWN COMPONENT..#TODO
          <View style={{ /*borderTopWidth: 7, borderTopColor: '#fff',*/borderBottomWidth: 7, borderBottomColor: '#fff',padding: 10}}>
            <View style={{flex: 1, alignItems: 'center',}}>
              <Image
                uri={{source: userProfile.profilePic}}
                style={{height: 60, padding: 7, width: 60, borderRadius: 30, alignItems: 'center', }}
              />
            </View>
            <Text style={{textAlign: 'center', padding: 5}}>
              {userProfile.name}
            </Text>
          </View>
        }
          {(!this.state.hideFilter) &&
            <View style={feedstyles.menuContainer}>
              <FilterMenuComponent category={this.props.category}
                filter={this.props.filter}
                _onPress={ () => this._updateFeed()}
                _addFilterId={ (id) => this._addFilterId(id)} // Add filterId, when _updaefeed is triggered, feed will be fetched
                _addGeo={ (isGeo) => this._addGeo(isGeo)}
                _addOrderBy={ (order) => this._addOrderBy(order) }
                filterIds={this.props.filter.chosenIds}
                orderByIds={this.state.orderByIds}
                isGeo={this.state.isGeo}
              />

            </View>
          }

          <View style={{flex: 1}}>
            <Feed
              posts={posts}
              sceneKey={this.props.sceneKey}
              fetchingNew={this.props.feed.fetchingNew}
              key={"feed_view"}
              PostActions={this.props.PostActions}
              user={this.props.user}
              feedType={feedType}
              _fetchNextSet={ () => this._fetchFeed(this.state.next)}
            />
          </View>
        </View>
    );
  }
  _fetchNextSet (){
    console.log  ("\n\n\nFETCHING NEXT SET");

  }

   // Move to parent
  _fetchFeed (fetchType){
    const {FeedActions} = this.props;
    FeedActions.fetchFeed(fetchType);
  }

  // Move to parent
  _grabCoords (){
    console.log("\n\nIs finding location");
     navigator.geolocation.getCurrentPosition(
      (position) => {
        // Grab coords and parse to action
        const {coords} = position;
        const {longitude, latitude,} = coords;

        this.props.FilterActions.setCoords(longitude, latitude);
        this._fetchFeed('GEO_FEED');
      },
      (error) => alert(error.message, "Make sure you've enabled locations for our app in setting"),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
};

// Redux stuff below (all of this will be parsed down to feedcomponent):
function mapStateToProps(state) {
  const { feed, filter, category, user, } = state;

  return {
    feed,
    filter,
    category,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    FeedActions: bindActionCreators(FeedActions, dispatch),
    FilterActions: bindActionCreators(FilterActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiFeedLayout);
