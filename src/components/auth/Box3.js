import React, { Component } from 'react'
import Box from '3box';

const Box = require('3box')
const Box3Context = React.createContext({})

export class Box3 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        box: {},
        myAddress: '',
        myDid: '',
        myProfile: {},
        isAppReady: false,
        topicList: [],
        topicManager: {},
        disableLogin: false,
      };
    }
  
    componentDidMount() {
      const { box } = this.state;
      this.setState({ isAppReady: true });
      window.ethereum.enable()
    }
  
    handleLogin = async () => {
      const { history } = this.props;
      const addresses = await window.ethereum.enable();
      const myAddress = addresses[0];
      this.setState({ disableLogin: true });
  
      // get my box and profile
      const box = await Box.openBox(myAddress, window.ethereum, {});
      const myProfile = await Box.getProfile(myAddress);
      await new Promise((resolve, reject) => box.onSyncDone(resolve));
  
      // open 3chat space
      const chatSpace = await box.openSpace('3chat');
      const myDid = chatSpace.DID;
  
      // set all to state and continue
      const loggedIn = true
      this.setState({ chatSpace, box, myProfile, myAddress, myDid, loggedIn });
    }
  
    render() {
      const {
        isAppReady,
        chatSpace,
        topicManager,
        topicList,
        myProfile,
        myAddress,
        myDid,
        disableLogin,
        loggedIn
      } = this.state;
  
      const contextValue = {
        myProfile,
        myAddress,
        myDid,
      }
  
      return (
          <Box3Context.Provider value={contextValue}>
              {this.props}
          </Box3Context.Provider>
      );
    }
  }
