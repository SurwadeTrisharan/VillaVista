import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import VillaResult from '../common/VillaResult';
import VillaSearch from '../common/VillaSearch';

const AllVillaPage = () => {
  const [villa, setVilla] = useState([]);
  const [filteredVilla, setFilteredVilla] = useState([]);
  const [villaTypes, setVillaTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  
  const [selectedVillaType, setSelectedVillaType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [villaPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  // Handle search result from VillaSearch
  const handleSearchResult = (results) => {
    setVilla(results);
    applyAllFilters(results);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getAllVilla();
        const allVilla = response.villaList;
        setVilla(allVilla);
        setFilteredVilla(allVilla);
        
        // Unique villa types and locations
        const types = await ApiService.getVillaTypes();
        setVillaTypes(types);

        const uniqueLocations = [...new Set(allVilla.map(v => v.city || v.location || 'Unknown'))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtering Logic
  const applyAllFilters = (baseVillaList = villa) => {
    let filtered = baseVillaList;

    if (selectedVillaType !== '') {
      filtered = filtered.filter(v => v.villaType === selectedVillaType);
    }

    if (selectedLocation !== '') {
      filtered = filtered.filter(v => (v.city || v.location) === selectedLocation);
    }

    if (minPrice !== '') {
      filtered = filtered.filter(v => parseFloat(v.price) >= parseFloat(minPrice));
    }

    if (maxPrice !== '') {
      filtered = filtered.filter(v => parseFloat(v.price) <= parseFloat(maxPrice));
    }

    if (availabilityDate !== '') {
      filtered = filtered.filter(v => new Date(v.availableFrom) <= new Date(availabilityDate));
    }

    setFilteredVilla(filtered);
    setCurrentPage(1);
  };

  // Handlers for filter changes
  const handleFilterChange = () => applyAllFilters();

  // Pagination logic
  const indexOfLastVilla = currentPage * villaPerPage;
  const indexOfFirstVilla = indexOfLastVilla - villaPerPage;
  const currentVilla = filteredVilla.slice(indexOfFirstVilla, indexOfLastVilla);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-villa'>
      <h2>All Villas</h2>

      {/* Filters */}
      <div className='all-villa-filter-div'>
        <label>Villa Type:</label>
        <select value={selectedVillaType} onChange={(e) => { setSelectedVillaType(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          {villaTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Location:</label>
        <select value={selectedLocation} onChange={(e) => { setSelectedLocation(e.target.value); handleFilterChange(); }}>
          <option value="">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <label>Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => { setMinPrice(e.target.value); handleFilterChange(); }}
        />

        <label>Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => { setMaxPrice(e.target.value); handleFilterChange(); }}
        />

        <label>Availability Before:</label>
        <input
          type="date"
          value={availabilityDate}
          onChange={(e) => { setAvailabilityDate(e.target.value); handleFilterChange(); }}
        />
      </div>

      {/* Search Component */}
      <VillaSearch handleSearchResult={handleSearchResult} />

      {/* Villa Results */}
      {loading ? (
        <p>Loading villas...</p>
      ) : filteredVilla.length === 0 ? (
        <p>No villas found matching the selected filters.</p>
      ) : (
        <>
          <VillaResult villaSearchResults={currentVilla} />
          <Pagination
            villaPerPage={villaPerPage}
            totalVilla={filteredVilla.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default AllVillaPage;
