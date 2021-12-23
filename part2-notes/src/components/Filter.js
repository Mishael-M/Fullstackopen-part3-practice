import React from 'react';

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <p>
      Filter shown with: <input value={filter} onChange={handleFilterChange} />
    </p>
  );
};

export default Filter;
