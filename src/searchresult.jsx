import React from 'react';
import { Breadcrumbs, BreadcrumbItem, Grid, Column, Row, Link, Callout} from 'react-foundation';

class SearchResult extends React.Component {
  render() {
    return (
      <Callout>
        <h3>{this.props.record.PROVIDER_NAME}</h3>
        <Breadcrumbs>
          <BreadcrumbItem>{this.props.record.LEVEL_1_CATEGORY}</BreadcrumbItem>
          <BreadcrumbItem>{this.props.record.LEVEL_2_CATEGORY}</BreadcrumbItem>
          <BreadcrumbItem>{this.props.record.PHYSICAL_REGION}</BreadcrumbItem>
        </Breadcrumbs>
        <Link href={this.props.record.PROVIDER_WEBSITE_1}>Website</Link>
        <Link href={this.props.record.PUBLISHED_PHONE_1}>Phone: {this.props.record.PUBLISHED_PHONE_1}</Link>
        <p>{this.props.record.ORGANISATION_PURPOSE}</p>
      </Callout>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', results: []};
  }
  renderSearchResults() {
    return this.props.results.map((record) =>
      <SearchResult record={record} />
    );
  }
  render() {
    return this.renderSearchResults()
  }
}

export default SearchResults;
