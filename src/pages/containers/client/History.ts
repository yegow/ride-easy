import { connect } from 'react-redux'

import History from '../../client/History'

const mapStateToProps = (state: any) => ({
  rides: state.rides,
})

export default connect(
  mapStateToProps,
)(History)