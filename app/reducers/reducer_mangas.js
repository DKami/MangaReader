import { PULL_MANGAS, PULL_MANGAS_SUCCESS, PULL_MANGA, PULL_MANGA_SUCCESS,
         PULL_MANGA_CHAPTER, PULL_MANGA_CHAPTER_SUCCESS
        } from '../actions/mangas';


const INITIAL_STATE = {
  mangas : [],
  loading: false,
  currentMangaIdViewing: '',
  currentMangaViewing: {
    chapters: []
  },
  currentMangaChapterNum:'',
  currentMangaChapterViewing: {
    name:'',
    pages:[]
  }
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case PULL_MANGAS:
        return {...state, loading: true};
      break;
    case PULL_MANGAS_SUCCESS:
        return {...state, mangas: action.mangas, loading: false};
      break;
    case PULL_MANGA:
        return {...state, loading: true};
      break;
    case PULL_MANGA_SUCCESS:
        return {...state, currentMangaIdViewing: action.mangaId,
                currentMangaViewing: action.manga, loading: false,
                currentMangaChapterNum:''};
      break;
    case PULL_MANGA_CHAPTER:
        return {...state, loading: true};
      break;
    case PULL_MANGA_CHAPTER_SUCCESS:
        return {...state, currentMangaChapterNum: action.chapterNum,
                currentMangaChapterViewing: action.chapter,
                currentMangaIdViewing: action.mangaId,
                loading: false};
      break;
    default:
      return state;
  }
}
