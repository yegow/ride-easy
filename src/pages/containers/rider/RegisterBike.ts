import { connect } from 'react-redux'

import RegisterBike from '../../rider/RegisterBike'

const mapStateToProps = (state: any) => ({
  user: state.session,
})

export default connect(
  mapStateToProps,
)(RegisterBike)