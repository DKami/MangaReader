import { connect } from 'react-redux';
import Search from '../components/Search';
import { push } from 'react-router-redux';

function mapStateToProps(state){
  return {
    mangas: state.mangas.mangas,
  }
}

function mapDispatchToProps(dispatch){
  return {
    update : (manga, index) => { if(index != -1) dispatch(push(`/manga/${manga.mangaId}`))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
