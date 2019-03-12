import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import React from 'react'

const Snackbar =({open})=> {
  return (
    <div>
      
    </div>
  )
}
export default Snackbar


class FadeSnackbar extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Open with Fade Transition</Button>
        <Snackbar
          open={this.state.open}
          onClose={()=>{
            this.setState({ open: false })
            this.props.history.push('/signin')
          }}
          TransitionComponent={Fade}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default FadeSnackbar;