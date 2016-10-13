'use strict';
import React from 'react';
import { ListView, StyleSheet, View, Text,} from 'react-native';
import CommentItem from './CommentItem';
import styles from './styles';

class CommentListView extends React.Component {
  static displayName = 'FiltCommentListViewerPicker';
  static propTypes = {
    comments: React.PropTypes.array, // Array of objects [{label: 'name', id: 3}]
  };


  constructor(props){
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      }
  }

  componentWillMount () {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.comments),
    });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.comments),
    });
  }

  _renderData (comment) {

      return (
        <CommentItem comment={comment} />
      );
  }

  render() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderData.bind(this)}
          horizontal={false}
          enableEmptySections={true}
          style={styles.listviewWrapper}
      />
    );
  }
};







export default CommentListView;
