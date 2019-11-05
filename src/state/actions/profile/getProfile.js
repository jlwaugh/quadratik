import Box from '3box';

export default async function getProfile(graphqlQueryObject) {
  let profile;
  try {
    profile = await Box.profileGraphQL(graphqlQueryObject);
  } catch (err) {
    return err;
  }
  return profile;
};