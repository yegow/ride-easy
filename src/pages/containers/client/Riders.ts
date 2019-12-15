import { connect } from 'react-redux'

import Riders from '../../client/Riders'

const mapStateToProps = (state: any) => ({
  riders: state.riders,
  user: state.session,
})

export default connect(
  mapStateToProps,
)(Riders)