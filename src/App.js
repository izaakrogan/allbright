import React from 'react';
import styled from 'styled-components';

import Deck from './components/Deck';

function App() {
  return (
    <CSS>
      <Deck />
    </CSS>
  );
}

const CSS = styled.div`
  * {
    box-sizing: border-box;
  }
`;

export default App;
