import React from 'react'
import styled from 'styled-components'
import WhiteKey from './WhiteKey';
import DisplayScreen from './DisplayScreen';
import PowerSwitch from './PowerSwitch';
import Knobs from './Knobs';
import BlackKey from './BlackKey';

const RootWrapper = styled.div`
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    color: #fff;
    box-shadow: 0 8px 6px -6px black;
    border: 1px solid black;
    background-color: #f1f1f1;
`

const ControlWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #123456;
    height: 100px;
    padding: 10px;
`

const KeyWrapper = styled.div`
    display: flex;
`

export default () => (
    <RootWrapper>
        <ControlWrapper>
            <PowerSwitch />
            <DisplayScreen/>
            <Knobs />
        </ControlWrapper>
        <KeyWrapper>
        <WhiteKey extend={"right"}/>
        <BlackKey />
        <WhiteKey extend={"left"}/>
        <BlackKey />
        <WhiteKey />
        <WhiteKey extend={"right"}/>
        <BlackKey />
        <WhiteKey extend={"left"}/>
        <BlackKey />
        <WhiteKey extend={"right"}/>
        <BlackKey />
        <WhiteKey extend={"left"}/>
        <WhiteKey />

        </KeyWrapper>
    </RootWrapper>
)