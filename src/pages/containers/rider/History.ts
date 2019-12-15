import { connect } from 'react-redux'

import History from '../../rider/History'

const mapStateToProps = (state: any) => ({
  user: state.session,
  rides: state.rides,
})

export default connect(
  mapStateToProps,
)(History)