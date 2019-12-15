import { connect } from 'react-redux'

import Toolbar from '../../rider/Toolbar'

const mapStateToProps = (state: any) => ({
  user: state.session,
  pendingRides: state.rides.filter((r: any) => r.status === 'pending').length
})

export const toolbarConnect = connect(
  mapStateToProps,
)

export default toolbarConnect(Toolbar)