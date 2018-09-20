import * as React from "react";
import { Page } from "../Layout";

export class Home extends React.Component {
  displayName = Home.name

  render() {
    return (
      <Page header="Demo" headerGlyph="home">
        <h4>Welcome!</h4>
      </Page>
    );
  }
}
