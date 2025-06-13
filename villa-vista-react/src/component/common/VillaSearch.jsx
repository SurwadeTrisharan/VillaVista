import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const VillaSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [villaType, setVillaType] = useState('');
  const [villaTypes, setVillaTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVillaTypes = async () => {
      try {
        const types = await ApiService.getVillaTypes();
        setVillaTypes(types);
      } catch (error) {
        console.error('Error fetching villa types:', error.message);
      }
    };
    fetchVillaTypes();
  }, []);

  /**This methods is going to be used to show errors */
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  /**THis is going to be used to fetch availabe villa from database base on seach data that'll be passed in */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !villaType) {
      showError('Please select all fields');
      return false;
    }
    try {
      // Convert startDate to the desired format
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      // Call the API to fetch available villa
      const response = await ApiService.getAvailableVillaByDateAndType(formattedStartDate, formattedEndDate, villaType);

      // Check if the response is successful
      if (response.statusCode === 200) {
        if (response.villaList.length === 0) {
          showError('villa not currently available for this date range on the selected villa type.');
          return
        }
        handleSearchResult(response.villaList);
        setError('');
      }
    } catch (error) {
      showError("Unown error occured: " + error.response.data.message);
    }
  };

  return (
    <section>
      <div className="search-container">
        <div className="search-field">
          <label>Check-in Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-in Date"
          />
        </div>
        <div className="search-field">
          <label>Check-out Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Check-out Date"
          />
        </div>

        <div className="search-field">
          <label>Villa Type</label>
          <select value={villaType} onChange={(e) => setVillaType(e.target.value)}>
            <option disabled value="">
              Select Villa Type
            </option>
            {villaTypes.map((villaType) => (
              <option key={villaType} value={villaType}>
                {villaType}
              </option>
            ))}
          </select>
        </div>
        <button className="home-search-button" onClick={handleInternalSearch}>
          Search Villa
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default VillaSearch;
