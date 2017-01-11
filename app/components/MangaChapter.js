import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import CircularProgress from 'material-ui/CircularProgress';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import R from 'ramda';

const loadingStyle = {marginLeft: '50%', left: -50, marginTop: '25%'}

export default class MangaChapter extends Component{

  constructor(...arg){
    super(...arg);
    this._getPageId = R.prop('pageId');
    this._getPages = R.prop('pages');
    this._getKeyCode = R.prop('keyCode');
    this._isLeftOrRightArrow = R.compose(R.contains(R.__, [37, 39]), this._getKeyCode)
    this._generatePageMenuItem = (pageId) =>
        (<MenuItem key={pageId} value={pageId} primaryText={`${pageId}`} />);
    this._toImageNode =
        (chapterPage) => (<img src={chapterPage.url} style={{display: 'block', margin: '0 auto'}}/>)
    this._pageToMenuItem = R.compose(this._generatePageMenuItem, this._getPageId);
    this._getMangaPageMenuItems = R.compose(R.map(this._pageToMenuItem), this._getPages);
    this._preloadNextImage = (chapterPage) => new Image().src = chapterPage.url;
    this._getImagePage = R.compose(R.map(this._toImageNode), this._getPages);
    this.shouldGoToPreviousPage = R.gt(R.__, 1)
    this._previousPage = R.ifElse(this.shouldGoToPreviousPage, R.dec, R.always(1))
    this.state = { currentPage: 1, chapterImages: this._getImagePage(this.props.chapter) };
  }
  componentWillMount(){
    this.props.getChapter(this.props.params.mangaId, this.props.params.chapterNum);
  }

  componentWillUnmount(){
    document.removeEventListener(this.navigationWithKeyboard);
  }

  componentWillReceiveProps(nextProps){
    const { chapter } = nextProps;
    this.setState({ currentPage: 1, chapterImages: this._getImagePage(chapter)});
  }

  handleChange(event, index, currentPage){
    this.setState({currentPage});
  };

  goToPreviousPage(){
    this.setState({
      currentPage: this._previousPage(this.state.currentPage)
    });
  }

  goToNextPage(){
    this.setState({
      currentPage: R.inc(this.state.currentPage)
    });
  }

  displayPage(){
    this._preloadNextImage(R.nth(this.state.currentPage, this._getPages(this.props.chapter)));
    return this.state.chapterImages[R.dec(this.state.currentPage)];
  }

  componentDidMount(){
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this._triggerMovePage = R.cond([
      [R.equals(37),  this.goToPreviousPage ],
      [R.equals(39),  this.goToNextPage ],
    ]);
    this._goToPage = R.compose(this._triggerMovePage ,this._getKeyCode)
    this._movePageEvent = R.ifElse(this._isLeftOrRightArrow, this._goToPage, () => null);
    this.navigationWithKeyboard = document.addEventListener("keydown",this._movePageEvent, false);
  }

  render(){
    const { chapter, loading } = this.props;
    const chapterName = chapter.name;
    const chapterNum = this.props.params.chapterNum;

    if(loading) return (<CircularProgress size={80} thickness={5} style={loadingStyle} />);

    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Chapter { chapterNum } : { chapterName } </h2>
        <div>
          {this.displayPage()}
        </div>
        <div>
        <br/>
          <Row  style={{textAlign: 'center'}}>
            <Col sm={4}>
              <RaisedButton
                label="Previous"
                primary={true}
                icon={<ChevronLeft />}
                onClick={this.goToPreviousPage}
              />
            </Col>
            <Col sm={4}>
              Page
              <SelectField
                value={""}
                onChange={this.handleChange.bind(this)}
                style={{width: '80px', display: 'inline-block'}}
                value={this.state.currentPage}
              >
                {this._getMangaPageMenuItems(chapter)}
              </SelectField>
              of { chapter.pages.length }
            </Col >
            <Col sm={4}>
              <RaisedButton
                labelPosition="before"
                label="Next"
                primary={true}
                icon={<ChevronRight />}
                style = {{display: 'inline-block'}}
                onClick={this.goToNextPage}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
