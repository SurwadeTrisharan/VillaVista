import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditVillaPage = () => {
    const { villaId } = useParams();
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

    useEffect(() => {
        const fetchVillaDetails = async () => {
            try {
                const response = await ApiService.getVillaById(villaId);
                setVillaDetails({
                    villaPhotoUrl: response.villa.villaPhotoUrl,
                    villaType: response.villa.villaType,
                    villaPrice: response.villa.villaPrice,
                    villaDescription: response.villa.villaDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchVillaDetails();
    }, [villaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVillaDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
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


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('villaType', villaDetails.villaType);
            formData.append('villaPrice', villaDetails.villaPrice);
            formData.append('villaDescription', villaDetails.villaDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateVilla(villaId, formData);
            if (result.statusCode === 200) {
                setSuccess('Villa updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-villa');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this villa?')) {
            try {
                const result = await ApiService.deleteVilla(villaId);
                if (result.statusCode === 200) {
                    setSuccess('Villa Deleted successfully.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-villa');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="edit-villa-container">
            <h2>Edit Villa</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-villa-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Villa Preview" className="villa-photo-preview" />
                    ) : (
                        villaDetails.villaPhotoUrl && (
                            <img src={villaDetails.villaPhotoUrl} alt="Villa" className="villa-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="villaPhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Villa Type</label>
                    <input
                        type="text"
                        name="villaType"
                        value={villaDetails.villaType}
                        onChange={handleChange}
                    />
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
                <button className="update-button" onClick={handleUpdate}>Update Villa</button>
                <button className="delete-button" onClick={handleDelete}>Delete Villa</button>
            </div>
        </div>
    );
};

export default EditVillaPage;
