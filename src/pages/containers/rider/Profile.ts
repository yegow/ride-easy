import { connect } from 'react-redux'

import Profile from '../../rider/Profile'

const mapStateToProps = (state: any) => ({
  user: state.session,
})

export default connect(
  mapStateToProps,
)(Profile)