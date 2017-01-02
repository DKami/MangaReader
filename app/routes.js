import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/AppContainer';
import Manga from './containers/MangaContainer';
import MangaChapter from './containers/MangaChapterContainer';
import MangaMain from './containers/MainMangaPageContainer';

export default (
  <Route path='/' component={App}>
      <IndexRoute component={MangaMain}/>
      <Route path='/manga/:mangaId' component={Manga}/>
      <Route path='/manga/:mangaId/chapter/:chapterNum' component={MangaChapter}/>
  </Route>
);
