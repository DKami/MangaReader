import { connect } from 'react-redux';
import MainMangaPage from '../components/MainMangaPage.js';

function mapStateToProps(state){
  return {
    mangas: state.mangas.mangas,
    loading: state.mangas.loading
  };
}

export default connect(mapStateToProps)(MainMangaPage);
