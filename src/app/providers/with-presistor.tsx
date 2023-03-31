import React from 'react';
import { persistor } from 'app/store';
import { PersistGate } from 'redux-persist/integration/react';

import Spinner from 'shared/ui/Spinner';

const withPresistor = (component: () => React.ReactNode) => function Presisted() {
  return (
    <PersistGate loading={<Spinner />} persistor={persistor}>
      {component()}
    </PersistGate>
  );
};

export default withPresistor;

