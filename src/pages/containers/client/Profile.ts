import { connect } from 'react-redux'

import Profile from '../../client/Profile'

const mapStateToProps = (state: any) => ({
  user: state.session,
})

export default connect(
  mapStateToProps,
)(Profile)