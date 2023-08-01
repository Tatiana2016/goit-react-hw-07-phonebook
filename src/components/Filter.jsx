import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/store';

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

const selectFilterValue = (state) => state.filter; // Selector function to get only the filter value

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);

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
