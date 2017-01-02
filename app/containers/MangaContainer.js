import { connect } from 'react-redux';
import Manga from '../components/Manga';
import { pullManga } from '../actions/mangas';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state){
  return {
    manga: state.mangas.currentMangaViewing,
    loading: state.mangas.loading
  };
}

function mapDispatchToProps(dispatch){
  return {
    fetchManga: bindActionCreators(pullManga, dispatch),
    readChapter: (mangaId, chapterNum) => { dispatch(push(`/manga/${mangaId}/chapter/${chapterNum}`)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Manga)
