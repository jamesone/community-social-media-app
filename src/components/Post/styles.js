import { StyleSheet } from 'react-native';
import {featureRed, featureGrey,} from '../StyleConstants';

const borderColor = '#E9EAED';
var styles=  StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomColor: '#000',
    // borderBottomWidth: 0.3,
    // backgroundColor
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    marginLeft: 2,
    marginRight: 2,
  },
  iconDefault: {
    color: featureGrey,
  },
  likebarCommentLength: {
    marginTop: 25,
  },
  likebarItem: {
    top: 5,
    padding: 2
  },
  likebar: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: borderColor,
  },
  wrapper: {
    paddingBottom: 4,
  },
  body: {
    flex: 1,
    alignSelf: 'stretch'
  },
  imageContainer: {
    flex: 1,
    // alignItems: 'stretch',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
   image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  header: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      padding: 10,
      // backgroundColor: featureRed

  },
  postedTime: {
    right: 5,
    top: 0,
    fontSize: 12,
  },
  profilePic: {
    height: 50,
    width: 50,
    // left: 0,
    borderRadius: 26,
    backgroundColor: '#ffd'
  },
  headUser: {
    fontSize: 15,
    marginLeft: 10,
  },
  location: {
    fontSize: 12,
    flex: 1,
  },
  head: {
    alignSelf: 'stretch',
    flexDirection:'row',
    flex:1,
    // backgroundColor: config.mainStyles.color.main,
    padding: 10,
    margin: 4,
    borderRadius: 5
  },
  description: {
    fontSize: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
  },

  text: {
    fontSize: 12
  },
  year: {
    textAlign: 'center',
  },
  input: {
    height: 50,
    margin: 20,
    padding: 4,
    fontSize: 18,
    paddingLeft: 20,
    backgroundColor: '#D3D3D3'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  postedOn: {
    right: 0,
    top: 5,
    position: 'absolute',
  },
  headerData: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    backgroundColor: 'transparent'
  }

});

export default styles;
