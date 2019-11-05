import {
    store,
  } from '../../store';
  import {
    startPollFlag,
    pollNetworkAndAddress,
  } from '../../../utils/address';
  
  import getVerifiedPrivateEmail from './getVerifiedPrivateEmail';
  import getVerifiedPublicGithub from './getVerifiedPublicGithub';
  import getVerifiedPublicTwitter from './getVerifiedPublicTwitter';
  import getMyMemberSince from './getMyMemberSince';
  import getMyDID from './getMyDID';
  import getMyProfileValue from './getMyProfileValue';
  // import getMyFollowing from './getMyFollowing';
  import getCollectibles from './getCollectibles';
  import getActivity from './getActivity';
  
  const getMyData = async () => {
    const {
      currentAddress,
    } = store.getState().userState;
  
    store.dispatch({
      type: 'UI_SPACES_LOADING',
      isSpacesLoading: true,
    });
    startPollFlag();
    pollNetworkAndAddress(); // Start polling for address change
  
    try {
      getVerifiedTwitter(); // eslint-disable-line
      getMyDID(); // eslint-disable-line  
      getActivity(); // eslint-disable-line
    } catch (err) {
      console.error(err);
    }
  };
  
  export default getMyData;