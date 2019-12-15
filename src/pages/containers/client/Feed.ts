import { connect } from 'react-redux'

import Feed from '../../client/Feed'

const mapStateToProps = (state: any) => ({
  user: state.session,
})

export default connect(
  mapStateToProps,
)(Feed)