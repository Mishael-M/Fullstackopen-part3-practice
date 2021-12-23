import React from 'react';
const Country = ({ country, setCountry }) => {
  const handleFilterChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <p>
      Find countries: <input value={country} onChange={handleFilterChange} />
    </p>
  );
};
export default Country;
