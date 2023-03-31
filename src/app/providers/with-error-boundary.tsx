import React, { Component, ReactNode } from "react";

import ErrorBoundry from "../ErrorBoundry";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  errorInfo?: any
}



class ErrorBoundaryComponent extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: any) {
    this.setState({
      error,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorBoundry />
      );
    }

    return this.props.children;
  }
}

const withBoundry = (component: () => React.ReactNode) => () =>
  <ErrorBoundaryComponent>{component()}</ErrorBoundaryComponent>;

export default withBoundry;