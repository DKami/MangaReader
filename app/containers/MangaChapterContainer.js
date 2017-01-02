import { connect } from 'react-redux';
import MangaChapter from '../components/MangaChapter';
import { pullChapter } from '../actions/mangas';
import { bindActionCreators } from 'redux';


function mapStateToProps(state){
  return {
    chapter: state.mangas.currentMangaChapterViewing,
    loading: state.mangas.loading

  };
}

function mapDispatchToProps(dispatch){
  return {
    getChapter: bindActionCreators(pullChapter, dispatch)
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(MangaChapter);
