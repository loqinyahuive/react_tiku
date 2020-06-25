import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import cmSingleCheckList from '../asset/json/cm';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

class tList extends Component {
  state = {
    datalist: [],
    inputText: ''
  }
  componentDidMount() {
    this.setState({
      datalist: cmSingleCheckList
    });
  }
  search() {
    var temp = [];
    if (this.state.inputText.length > 0) {
      cmSingleCheckList.map((item) => {
        if (item.indexOf(this.state.inputText) > -1) {
          temp.push(item);
        }
      });
      this.setState({
        datalist: temp
      });
    } else {
      this.setState({
        datalist: cmSingleCheckList
      });
    }
  }
  render() {
    return (
      <div>
        <Paper component="form">
          <IconButton aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            placeholder="搜题啦"
            inputProps={{ 'aria-label': '搜题啦' }}
            onChange ={(event) => {
              console.log(event.target.value);
              this.setState({
                inputText: event.target.value
              })
            } }
          />
          <IconButton
            type="submit"
            aria-label="search"
            onClick={() => this.search()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.datalist.map((item, index) => {
            return (
              <div>
                <ListItem button>
                  <ListItemText primary={`${index + 1}: ${item}`} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default tList;
