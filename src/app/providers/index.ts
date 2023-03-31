import compose from "compose-function";
import withRouter from "./with-router";
import withStore from "./with-store";
import withPresistor from "./with-presistor";
import withBoundary from "./with-error-boundary";

const withProviders = compose(
  withRouter,
  withStore,
  withPresistor,
  withBoundary
);

export default withProviders;
