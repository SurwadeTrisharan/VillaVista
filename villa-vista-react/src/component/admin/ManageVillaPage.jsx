import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import VillaResult from '../common/VillaResult';

const ManageVillaPage = () => {
  const [villa, setVilla] = useState([]);
  const [filteredVilla, setFilteredVilla] = useState([]);
  const [villaTypes, setVillaTypes] = useState([]);
  const [selectedVillaType, setSelectedVillaType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [villaPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const response = await ApiService.getAllVilla();
        const allVilla = response.villaList;
        setVilla(allVilla);
        setFilteredVilla(allVilla);
      } catch (error) {
        console.error('Error fetching villa:', error.message);
      }
    };

    const fetchVillaTypes = async () => {
      try {
        const types = await ApiService.getVillaTypes();
        setVillaTypes(types);
      } catch (error) {
        console.error('Error fetching villa types:', error.message);
      }
    };

    fetchVilla();
    fetchVillaTypes();
  }, []);

  const handleVillaTypeChange = (e) => {
    setSelectedVillaType(e.target.value);
    filteredVilla(e.target.value);
  };

  const filterVilla = (type) => {
    if (type === '') {
      setFilteredVilla(villa);
    } else {
      const filtered = villa.filter((villa) => villa.villaType === type);
      setFilteredVilla(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastVilla = currentPage * villaPerPage;
  const indexOfFirstVilla = indexOfLastVilla - villaPerPage;
  const currentVilla = filteredVilla.slice(indexOfFirstVilla, indexOfLastVilla);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-villa'>
      <h2>All Villa</h2>
      <div className='all-villa-filter-div' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='filter-select-div'>
          <label>Filter by Villa Type:</label>
          <select value={selectedVillaType} onChange={handleVillaTypeChange}>
            <option value="">All</option>
            {villaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button className='add-villa-button' onClick={() => navigate('/admin/add-villa')}>
            Add Villa
          </button>
        </div>
      </div>

      <VillaResult villaSearchResults={currentVilla} />

      <Pagination
        villaPerPage={villaPerPage}
        totalVilla={filteredVilla.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ManageVillaPage;
