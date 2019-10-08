import React, { Fragment } from 'react';

import Header from './Header/Header';
import PlayerTable from './PlayerTable/PlayerTable';
import PlayerModal from './Modal/Modal';

const App = () => {
  return (
    <Fragment>
      <Header />
      <PlayerTable />
      <PlayerModal />
    </Fragment>
  );
};

export default App;
