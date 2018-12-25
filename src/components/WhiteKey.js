import React from 'react'
import styled from 'styled-components'

const RootWrapper = styled.div`
    background-color: white;
    width: 4em;
    height: 14em;
    cursor: pointer;
    border: 1px solid black;
    color: black;
    z-index: 1;
    margin: 0 ${({extend}) => extend === 'right' ? '-1em' : '0'} 0 ${({extend}) => extend === 'left' ? '-1em' : '0'};

`

export default ({extend}) => (
    <RootWrapper extend={extend}>
        KEY
    </RootWrapper>
)