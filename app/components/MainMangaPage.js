import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Link from 'react-router';
import R from 'ramda';

const loadingStyle = {marginLeft: '50%', left: -50, marginTop: '25%'}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
  },
};


export default class MainMangaPage extends Component{

  constructor(...args){
    super(...args);

    this._generateRandomNumber = (mangas) => R.multiply(Math.random(),mangas.length);
    this._generateRoundedNumber = R.compose(Math.floor, this._generateRandomNumber);
    this._getRandomItems = R.curry((mangas, emptyElement) => R.nth(this._generateRoundedNumber(mangas) , mangas));
    this._getRandomMangas = (mangas, randomMangas) => R.map(this._getRandomItems(mangas))(randomMangas);
    this.state = {randomMangas: []};
  }

  mangaToGridItem(manga){
    return (
      <GridTile
        key={manga.mangaId}
        title={manga.name}
        //subtitle={<span>by <b>{tile.author}</b></span>}
      >
        <img src={manga.cover} />
      </GridTile>
    );
  }

  generateMangaGridItem(){
    return R.map(this.mangaToGridItem, this.state.randomMangas);
  }

  updateState({mangas, loading}){
    let randomMangas = this._getRandomMangas(mangas, Array(12));
    this.setState({
      mangas, loading, randomMangas
    });
  }

  componentWillMount(){
    this.updateState(this.props);
  }

  componentWillReceiveProps(newProps){
    this.updateState(newProps);
  }

  render(){
    const { loading } = this.props;
    if(loading) return (<CircularProgress size={80} thickness={5} style={loadingStyle} />);
    return(
      <GridList
      cellHeight='auto'
      style={styles.gridList}
      cols={3}
      >
      <Subheader>Random Manga</Subheader>
      {this.generateMangaGridItem()}
    </GridList>
    );
  }
}
