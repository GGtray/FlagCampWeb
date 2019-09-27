import React, { Fragment } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { database } from '../firebase/firebase';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  chip: {
    margin: theme.spacing(1),
  },
});


class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {InputForm: '', title: 'java'};
    }
    
    handleInputChange = (e) => {
        console.log('fuck');
        console.log(e.target.value);
        this.setState({InputForm : e.target.value});
        
    }
    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }



    handleClick = () => {
        // console.log(this.state.InputForm);
        database.ref('/users/' + this.props.userId + '/userinfo/').set({
            location: this.state.InputForm,
            title: this.state.title,
        })
    }

    handleClickChip = () => {
        console.log('click chip')
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <form className={classes.container} noValidate autoComplete="off">
              
              <TextField
                required
                id="standard-required"
                label="Title"
                defaultValue="Java"
                className={classes.textField}
                margin="normal"
                onChange={this.handleTitleChange}
              />
        
        
              <TextField
                id="standard-with-placeholder"
                label="Location"
                placeholder="location you prefer"
                className={classes.textField}
                margin="normal"
                onChange={this.handleInputChange}
              />
        
              <Button variant="contained" color="primary" className={classes.button}
                onClick={this.handleClick}
                >
                submit
              </Button>
        
            
            </form>
            <Chip
                variant="outlined"
                size="small"
                label="Clickable Chip"
                onClick={this.state.handleClickChip}
                className={classes.chip}
            />
            </Fragment>
            
          );
    }
 
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
};


export default connect(mapStateToProps)(withStyles(styles)(InputForm));