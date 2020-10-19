import React from 'react';
import styled from 'styled-components';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';

import Card from './Card';
import initDeck from '../utils/initDeck';

export default function Deck() {
  const deckSize = 100;
  const [deck, setDeck] = React.useState(initDeck(deckSize));
  const [selected, setSelected] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);
  const topCardRef = React.useRef();

  function getCard(card, idx) {
    if (idx === 0) {
      return (
        <Card
          card={card}
          key={card.id}
          removeCardFromDeck={removeCardFromDeck}
          ref={topCardRef}
          zIndex={deckSize - idx}
        />
      );
    }

    return (
      <Card
        card={card}
        key={card.id}
        removeCardFromDeck={removeCardFromDeck}
        zIndex={deckSize - idx}
      />
    );
  }

  function removeCardFromDeck(isSelected) {
    const card = deck[0];
    if (isSelected) {
      setSelected(selected.concat(card));
    } else {
      setRejected(rejected.concat(card));
    }

    setDeck(deck.slice(1));
  }

  function handleClick(isSelected) {
    if (topCardRef.current) {
      topCardRef.current.handleButtonPressed(isSelected);
    }
  }

  return (
    <Container>
      <DeckWrapper>
        <p>out of cards :(</p>
        {deck.slice(0, 5).map(getCard)}
      </DeckWrapper>
      <ButtonWrapper>
        <Cross onClick={() => handleClick(false)} />
        <Tick onClick={() => handleClick(true)} />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 20em;
  margin: auto;
`;

const DeckWrapper = styled.div`
  height: 30em;
  width: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

const Cross = styled(FaTimesCircle)`
  width: 4em;
  height: 4em;
  color: forestgreen;
`;

const Tick = styled(FaCheckCircle)`
  width: 4em;
  height: 4em;
  color: #8a0303;
`;
