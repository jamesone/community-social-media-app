import { StyleSheet } from 'react-native';
import {featureRed, featureGreyMid, featureGrey, borderColor, featureLightGrey, backgroundGrey,} from '../StyleConstants';


var styles=  StyleSheet.create({
 likeBarText:  {
    width: 30,
  },
  postLiked: {
    color: featureRed
  },
  iconColor: {
    color: featureGrey,
  },
  likebarItem: {
    // paddingTop: 3,
  },
  likebar: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6,
    // paddingBottom: 3,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: featureGreyMid,

  },
});

export default styles;
