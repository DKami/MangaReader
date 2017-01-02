import React, { Component } from "react";
import AutoComplete from 'material-ui/AutoComplete';

export default class Search extends Component{
  render(){
    const { mangas } = this.props;
    return (<div>
      <AutoComplete
        hintText="Search a manga"
        dataSource={mangas}
        dataSourceConfig={{text: 'name', value:'mangaId'}}
        onNewRequest={this.props.update}
        filter={AutoComplete.caseInsensitiveFilter}
        maxSearchResults={20}
        open={false}
      />
      </div>
    );
  }
}
