import request from 'request';
import R from 'ramda';

export const SEARCH_MANGA = "SEARCH_MANGA";
export const PULL_MANGAS = "PULL_MANGAS";
export const PULL_MANGAS_SUCCESS = "PULL_MANGAS_SUCCESS";
export const PULL_MANGA = "PULL_MANGA";
export const PULL_MANGA_SUCCESS = "PULL_MANGA_SUCCESS";
export const PULL_MANGA_CHAPTER = "PULL_MANGA_CHAPTER";
export const PULL_MANGA_CHAPTER_SUCCESS = "PULL_MANGA_CHAPTER_SUCCESS";

const BASE_URL = 'https://doodle-manga-scraper.p.mashape.com/mangareader.net';
const getCurrentMangaIdViewing = R.path(['mangas', 'currentMangaIdViewing']);
const getCurrentChapterNumViewing = R.path(['mangas', 'currentMangaChapterNum']);
const compareMangaId = (mangaId) => R.compose(R.equals(mangaId), getCurrentMangaIdViewing);
const compareChapterNum = (chapterNum) => R.compose(R.equals(chapterNum), getCurrentChapterNumViewing);
const shouldNotPullManga = (mangaId, getState) => compareMangaId(mangaId)(getState());
const shouldNotPullChapter = (mangaId, chapterNum, getState) =>
                                  R.and(shouldNotPullManga(mangaId, getState),
                                        compareChapterNum(chapterNum)(getState()));

export function pullMangas(){
  var options = {
    url: `${BASE_URL}?cover=1`,
    headers: {
      'X-Mashape-Key': 'tP6tJFZXzAmshaRMSq2ebpFKof98p10b7YsjsnOPvG23mufOm5'
    }
  };
    return (dispatch, getState) => {
        dispatch(pullingMangas());
        request(options, (err, response, body) => {
            dispatch(pullingMangasSuccess(JSON.parse(body)));
        });
    }
}

export function pullingMangas(){
  return {
    type: PULL_MANGAS
  };
}

export function pullingMangasSuccess(mangas){
  return {
    type: PULL_MANGAS_SUCCESS,
    mangas
  };
}

export function pullManga(mangaId){
    var options = {
      url: `${BASE_URL}/manga/${mangaId}/`,
      headers: {
        'X-Mashape-Key': 'tP6tJFZXzAmshaRMSq2ebpFKof98p10b7YsjsnOPvG23mufOm5'
      }
    };
    return (dispatch, getState) => {
        if(shouldNotPullManga(mangaId, getState)) return;
        dispatch(pullingManga());
        request(options, (err, response, body) => {
            dispatch(pullingMangaSuccess(JSON.parse(body), mangaId));
        });
    }
}

export function pullingManga(){
  return {
    type: PULL_MANGA
  };
}

export function pullingMangaSuccess(manga, mangaId){
  return {
    type: PULL_MANGA_SUCCESS,
    mangaId,
    manga
  };
}

export function pullChapter(mangaId, chapterNum){
    var options = {
      url: `${BASE_URL}/manga/${mangaId}/${chapterNum}`,
      headers: {
        'X-Mashape-Key': 'tP6tJFZXzAmshaRMSq2ebpFKof98p10b7YsjsnOPvG23mufOm5'
      }
    };
    return (dispatch, getState) => {
        if(shouldNotPullChapter(mangaId, chapterNum, getState)) return;
        dispatch(pullingChapter());
        request(options, (err, response, body) => {
            dispatch(pullingMangaChapterSuccess(JSON.parse(body), chapterNum, mangaId));
        });
    }
}

export function pullingChapter(){
  return {
    type: PULL_MANGA_CHAPTER
  };
}

export function pullingMangaChapterSuccess(chapter, chapterNum, mangaId){
  return {
    type: PULL_MANGA_CHAPTER_SUCCESS,
    chapter,
    chapterNum,
    mangaId
  };
}
