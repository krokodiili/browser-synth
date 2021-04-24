import React from "react";
import styled from "styled-components";

const BPMSelectorView = ({ value, onChange }) => {
  return (
    <div>
      {value}
      <button onClick={() => onChange(value + 1)}> up </button>
      <button onClick={() => onChange(value - 1)}> down </button>
    </div>
  );
};

const RootWrapper = styled.div`
  display: flex;
`;

export default BPMSelectorView;
