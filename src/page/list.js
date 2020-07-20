import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import cmSingleCheckList from '../asset/json/cm';
import cmMulCheckList from '../asset/json/multiple';
import cmPdList from '../asset/json/pd';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
class tList extends Component {
  
  state = {
    datalist: [],
    inputText: '采煤',
    current: 'single'
  };
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps,nextState)
  // }
  componentDidMount() {
    this.setState({
      datalist: cmSingleCheckList
    });
  }
  search() {
    var temp = [];
    var list = [];
    if (this.state.current == "single") {
      list = cmSingleCheckList;
    } else if (this.state.current == "multiple") {
      list = cmMulCheckList;
    } else {
      list = cmPdList;
    }
    list.map(item => {
      if (item.content.indexOf(this.state.inputText) > -1) {
        console.log(item);
        temp.push(item);
      }
    });
    this.setState({
      datalist: temp
    });
    if (this.state.inputText.length == 0) {
      if (this.state.current == "single") {
        this.setState({
          datalist: cmSingleCheckList
        });
      } else if (this.state.current == "multiple") {
        this.setState({
          datalist: cmMulCheckList
        });
      } else {
        list = cmPdList
      }
      
    }
  }
  clear() {
    this.setState({
      inputText: '',
      datalist: cmSingleCheckList
    });
  }

  handleChange = event => {
    this.setState({ current: event.target.value });
    if (event.target.value == "single") {
      this.setState({
        datalist: cmSingleCheckList
      });
    } else if (event.target.value == "multiple") {
      this.setState({
        datalist: cmMulCheckList
      });
    } else {
      this.setState({
        datalist: cmPdList
      });
    }
  };
  render() {
    return (
      <div>
        <Box component="form" m={1}>
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
        </Box>
        {/* <Box component="div" m={1} style={{ position: 'absolute', top: "10px", right: "5px" }}>
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
          </Box> */}
          &nbsp;&nbsp;
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
          &nbsp;&nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            刷新
          </Button>
        <Box component="div" m={1}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue={this.state.current}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="single"
              control={<Radio color="primary" />}
              label="单选题"
              labelPlacement="single"
            />
            <FormControlLabel
              value="multiple"
              control={<Radio color="primary" />}
              label="多选题"
              labelPlacement="multiple"
            />
            <FormControlLabel
              value="pd"
              control={<Radio color="primary" />}
              label="判断题"
              labelPlacement="pd"
            />
          </RadioGroup>
          </FormControl>
        </Box>


        <List component="nav" aria-label="secondary mailbox folders">
          {this.state.datalist.map((item, index) => {
            var re = new RegExp(this.state.inputText, 'g');

            if(item.content) {
              item.content = item.content.replace(
                re,
                `<span style="color:red">${this.state.inputText}</span>`
              );
            }

            if(item.core) {
              item.core.map(v => {
                if (v != '') {
                  if(item.content) {
                    item.content = item.content.replace(
                      new RegExp(v, 'g'),
                      `<span style="color:green;font-weight: bolder">${v}</span>`
                    );
                  }
                }
              });
            }
            
            return (
              <div>
                <ListItem button>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${index + 1}. ${item.content}`
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
