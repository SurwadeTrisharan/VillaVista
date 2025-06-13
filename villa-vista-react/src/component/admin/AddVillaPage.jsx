import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';


const AddVillaPage = () => {
    const navigate = useNavigate();
    const [villaDetails, setVillaDetails] = useState({
        villaPhotoUrl: '',
        villaType: '',
        villaPrice: '',
        villaDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [villaTypes, setVillaTypes] = useState([]);
    const [newVillaType, setNewVillaType] = useState(false);


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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setVillaDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleVillaTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewVillaType(true);
            setVillaDetails(prevState => ({ ...prevState, villaType: '' }));
        } else {
            setNewVillaType(false);
            setVillaDetails(prevState => ({ ...prevState, villaType: e.target.value }));
        }
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const addVilla = async () => {
        if (!villaDetails.villaType || !villaDetails.villaPrice || !villaDetails.villaDescription) {
            setError('All villa details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this villa?')) {
            return
        }

        try {
            const formData = new FormData();
            formData.append('villaType', villaDetails.villaType);
            formData.append('villaPrice', villaDetails.villaPrice);
            formData.append('villaDescription', villaDetails.villaDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addVilla(formData);
            if (result.statusCode === 200) {
                setSuccess('Villa Added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-villa');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="edit-villa-container">
            <h2>Add New Villa</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-villa-form">
                <div className="form-group">
                    {preview && (
                        <img src={preview} alt="Villa Preview" className="villa-photo-preview" />
                    )}
                    <input
                        type="file"
                        name="villaPhoto"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label>Villa Type</label>
                    <select value={villaDetails.villaType} onChange={handleVillaTypeChange}>
                        <option value="">Select a villa type</option>
                        {villaTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newVillaType && (
                        <input
                            type="text"
                            name="villaType"
                            placeholder="Enter new villa type"
                            value={villaDetails.villaType}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className="form-group">
                    <label>Villa Price</label>
                    <input
                        type="text"
                        name="villaPrice"
                        value={villaDetails.villaPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Villa Description</label>
                    <textarea
                        name="villaDescription"
                        value={villaDetails.villaDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={addVilla}>Add Villa</button>
            </div>
        </div>
    );
};

export default AddVillaPage;
