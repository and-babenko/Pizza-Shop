import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

import Spinner from "shared/ui/Spinner";

const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>{component()}</Suspense>
    </BrowserRouter>
  );

export default withRouter;
