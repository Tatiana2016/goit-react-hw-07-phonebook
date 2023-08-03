import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/slices';

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #2ecc71;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #2ecc71;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
`;

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filter);

  const handleChangeFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Label>
      Filter contacts by name:
      <Input type="text" value={filterValue} onChange={handleChangeFilter} />
    </Label>
  );
};

export default Filter;
