import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Othello from '../components/Othello';
import * as BoardActions from '../actions/board';

function mapStateToProps(state) {
  return {
    board: state.board,
    game: state.game
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(BoardActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Othello);
