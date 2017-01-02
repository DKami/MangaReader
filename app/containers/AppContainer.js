import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps(state){
  return {
    loading: state.mangas.loading
  };
}

export default connect(mapStateToProps, null)(App);
