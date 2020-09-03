import React, { useState, useEffect, useMemo } from 'react'
import {
  SwitchTransition,
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group'
import styled from 'styled-components'
export interface ICarouselProps {}
const img = [
  'https://picsum.photos/200/300?1',
  'https://picsum.photos/200/300?2',
  'https://picsum.photos/200/300?3',
  'https://picsum.photos/200/300?4',
  'https://picsum.photos/200/300?5',
]
const Carousel: React.FC<ICarouselProps> = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const images = useMemo(() => {
    return img.map((ele, i) => (
      <CSSTransition timeout={500} classNames="slide" key={i}>
        <div className={`bg${i + 1} iii`}></div>
      </CSSTransition>
    ))
  }, [])
  function nextImage() {
    setCurrentImage(currentImage + 1 >= img.length ? 0 : currentImage + 1)
  }
  useEffect(() => {
    const id = setTimeout(() => nextImage(), 2000)
    return () => clearTimeout(id)
  }, [currentImage])
  return (
    <CarouselStyle>
      <span>Current id is {currentImage}</span>
      <button onClick={nextImage}>click</button>
      <TransitionGroup className="slide-ctn">
        <SwitchTransition mode="out-in">
          {images[currentImage]}
        </SwitchTransition>
      </TransitionGroup>
    </CarouselStyle>
  )
}
const CarouselStyle = styled.div`
  > * {
    clear: left;
  }
  .bg1 {
    background-image: url(https://picsum.photos/200/300?1);
  }
  .bg2 {
    background-image: url(https://picsum.photos/200/300?2);
  }
  .bg3 {
    background-image: url(https://picsum.photos/200/300?3);
  }
  .bg4 {
    background-image: url(https://picsum.photos/200/300?4);
  }
  .bg5 {
    background-image: url(https://picsum.photos/200/300?5);
  }
  .slide-ctn {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .iii {
    height: 300px;
    width: 200px;
    border: solid 1px black;
  }
  .slide-enter {
    opacity: 0;
    transform: translateX(200%);
  }
  .slide-enter-active {
    opacity: 1;
    transform: translateX(0%);
    transition: all 500ms;
  }

  .slide-exit {
    transform: translateX(0%);
    opacity: 1;
  }
  .slide-exit-active {
    opacity: 0;
    transform: translateX(-200%);
    transition: all 500ms;
  }
  .slide-exit-done {
    opacity: 0;
  }
`

export { Carousel }
