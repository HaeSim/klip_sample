import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
  transition: 0.3s;
  position: relative;
  border-radius: 8px;
  width:100%;
  max-width: 250px;
  overflow: hidden;
  display: inline-block;
  margin:10px;
  box-shadow: 0 20px 35px rgba(0,0,0,0.3);
  transform: scale(1);

  &:hover{
	  transform: scale(1.05);
  }
`
const Card = ({card}) => {
  return (
    <div>
      <CardWrapper>
        <a style={{textDecoration: 'none',
                  color: 'black'}} href={card.external_link}>
          <div>
            <img width="250" id="myImage" src={card.image} crossOrigin="anonymous" alt='pic'/>
          </div>
          <div>
            <h2 style={{textAlign : 'center'}}>{card.name}</h2>
            <p>{card.description}</p>
          </div>
        </a>
		  </CardWrapper>
    </div>
  )
}

export default Card