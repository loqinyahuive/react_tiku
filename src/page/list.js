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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class tList extends Component {
  state = {
    datalist: [],
    inputText: ''
  };
  componentDidMount() {
    this.setState({
      datalist: cmSingleCheckList
    });
  }
  search() {
    var temp = [];
    cmSingleCheckList.map(item => {
      if (item.indexOf(this.state.inputText) > -1) {
        console.log(item);
        temp.push(item);
      }
    });
    this.setState({
      datalist: temp
    });
    if (this.state.inputText.length == 0) {
      this.setState({
        datalist: cmSingleCheckList
      });
    }
  }
  clear() {
    this.setState({
      inputText: '',
      datalist: cmSingleCheckList
    });
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
            // fullWidth="true"
            margin="dense"
            value={this.state.inputText}
            onChange={event => {
              console.log(event.target.value);
              this.setState({
                inputText: event.target.value
              });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.search();
            }}
          >
            搜索
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.clear();
            }}
          >
            清空
          </Button>
        </Paper>
        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.datalist.map((item, index) => {
            var re = new RegExp(this.state.inputText, 'g');
            item = item.replace(
              re,
              `<span style="color:red">${this.state.inputText}</span>`
            );
            return (
              <div>
                <ListItem button>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<div>${index + 1}. ${item}</div>`
                    }}
                  />
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
