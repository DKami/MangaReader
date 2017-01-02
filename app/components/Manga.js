import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router';
import R from 'ramda'
import { browserHistory } from 'react-router';

const loadingStyle = {marginLeft: '50%', left: -50, marginTop: '25%'}


export default class Manga extends Component {

  constructor(...arg){
     super(...arg);
     this._getMangaIdprops = R.path(['props', 'params', 'mangaId']);
     this._getMangaChapter = R.prop('chapters');
     this._getChapterId = R.prop('chapterId');
     this._getChapterName = R.prop('name');
     this._fetchManga = R.compose(this.props.fetchManga, this._getMangaIdprops);
     this.renderChapters = R.compose(R.map(this.chapterToHtml.bind(this)), this._getMangaChapter);

  }

  fetchManga(){
     this._fetchManga(this);
  }

  chapterToHtml(chapter){
    const chapterId = this._getChapterId(chapter);

    return (
      <TableRow key={ chapterId } onClick={this.rowClicked}>
        <TableRowColumn>{ chapterId }</TableRowColumn>
        <TableRowColumn>{ this._getChapterName(chapter) }</TableRowColumn>
      </TableRow>
    );
  }

  rowClicked(p){
    this.props.readChapter(this._getMangaIdprops(this), parseInt(p) + 1);
  }

  componentWillMount(){
     this.fetchManga();
  }

  componentWillReceiveProps(){
     this.fetchManga();
  }

  render(){
    const { manga, loading } = this.props

    if(loading) return (<CircularProgress size={80} thickness={5} style={loadingStyle} />);

    return (
      <div>
        <br/>
        <div>
          <img src={manga.cover} style={{display: 'block', margin: '0 auto'}}/>
        </div>
        <br/>
        <div style={{ 'textAlign': 'center'}}>
          <p>Description : </p>
          <p>{ manga.info }</p>
        </div>
        <br/>
        <div>
          <Table
          height={'600px'}
          selectable={true}
          onRowSelection={this.rowClicked.bind(this)}
          multiSelectable={false}
          >
           <TableHeader
           displaySelectAll={false}
           >
             <TableRow>
               <TableHeaderColumn>Chapitre</TableHeaderColumn>
               <TableHeaderColumn>Nom</TableHeaderColumn>
             </TableRow>
           </TableHeader>
           <TableBody
           displayRowCheckbox={false}
           showRowHover={true}
           >
             { this.renderChapters(manga) }
           </TableBody>
          </Table>
        </div>
      </div>
    );
  }
};
