import React, {useEffect} from 'react';
import styled from 'styled-components';

export default React.forwardRef(Card);

function Card(props, topCardRef) {
  const ref = React.useRef();
  const transitionDelay = 400;

  React.useImperativeHandle(topCardRef, () => {
    return {
      handleButtonPressed(isSelected) {
        const dir = isSelected ? '' : '-';
        ref.current.style.transition = `ease ${transitionDelay}ms`;
        const translation = `translate3d(${dir}70vw, 0, 0)`;
        const rotation = `rotate(${dir}70deg)`;
        ref.current.style.transform = `${translation} ${rotation}`;
        setTimeout(() => {
          props.removeCardFromDeck(isSelected);
        }, transitionDelay);
      },
    };
  });

  useEffect(() => {
    const {current} = ref;
    let mousedown;
    let startX;
    let startY;

    current.addEventListener('mousedown', mouseDown);
    current.addEventListener('mousemove', mouseMove);
    current.addEventListener('mouseup', mouseUp);

    function mouseDown(e) {
      e.preventDefault();
      mousedown = true;
      startX = e.screenX;
      startY = e.screenY;
    }

    function mouseMove(e) {
      e.preventDefault();
      if (mousedown) {
        const dx = e.screenX - startX;
        const dy = e.screenY - startY;
        const translation = `translate3d(${dx}px, ${dy}px, 0)`;
        const rotation = `rotate(${dx / 20}deg)`;
        current.style.transform = `${translation} ${rotation}`;
      }
    }

    function mouseUp(e) {
      e.preventDefault();
      mousedown = false;
      const dx = e.screenX - startX;
      const swipeOut = Math.abs(dx) > 150;
      if (swipeOut) {
        animateOut(e);
      } else {
        animateBack();
      }
    }

    function animateOut(e) {
      const curX = e.screenX - startX;
      const curY = e.screenY - startY;
      const isSelected = curX > 0;
      const dir = isSelected ? '' : '-';
      current.style.transition = `ease ${transitionDelay}ms`;
      const translation = `translate3d(${dir}70vw, ${curY}px, 0)`;
      const rotation = `rotate(${curX / 10}deg)`;
      current.style.transform = `${translation} ${rotation}`;
      setTimeout(() => {
        props.removeCardFromDeck(isSelected);
      }, transitionDelay);
    }

    function animateBack() {
      current.style.transition = 'ease 100ms';
      current.style.transform = `translate3d(0, 0, 0)`;
      setTimeout(() => {
        current.style.transition = 'none';
      }, 100);
    }

    return () => {
      current.removeEventListener('mousedown', mouseDown);
      current.removeEventListener('mousemove', mouseMove);
      current.removeEventListener('mouseup', mouseUp);
    };
  }, [props]);

  return (
    <Container ref={ref} style={{zIndex: props.zIndex}}>
      <Img src={props.card.image} alt='headshot' />
      <TextWrap>
        <p>{props.card.name}</p>
        <p>Stunt {props.card.jobTitle}</p>
      </TextWrap>
    </Container>
  );
}

const Container = styled.div`
  height: 30em;
  width: 20em;
  background-color: rgb(200, 200, 190);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  will-change: transform;
  padding: 20px;
  border-radius: 4px;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const TextWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
