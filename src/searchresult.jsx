import React from 'react';
import { Breadcrumbs, BreadcrumbItem, Column, Row, Link, Callout} from 'react-foundation';

class SearchResult extends React.Component {
  render() {
    return (
      <Callout>
        <Row>
          <h3>{this.props.record.PROVIDER_NAME}</h3>
          <Column>
            <Breadcrumbs>
              <BreadcrumbItem>{this.props.record.LEVEL_1_CATEGORY}</BreadcrumbItem>
              <BreadcrumbItem>{this.props.record.LEVEL_2_CATEGORY}</BreadcrumbItem>
            </Breadcrumbs>
          </Column>
          <Column>
            <Link to={this.props.record.PROVIDER_WEBSITE_1}>Website</Link>
          </Column>
        </Row>
        <Row>
          <Column>{this.props.record.PHYSICAL_REGION}</Column>
          <Column>{this.props.record.LATITUDE} / {this.props.record.LONGITUDE}</Column>
          <Column>{this.props.record.ORGANISATION_PURPOSE}</Column>
        </Row>
      </Callout>
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', results: []};
  }
  render() {
    return this.props.results.map((record) =>
      <SearchResult record={record} />
    );
  }
}

export default SearchResults;
