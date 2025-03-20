// import React, { useState } from 'react';
// import axios from 'axios';



// const AddProperty = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [location, setLocation] = useState('');
//     const [builtUp, setBuiltUp] = useState(0);
//     const [parking, setParking] = useState('');
//     const [price, setPrice] = useState(0);
//     const [bhk, setBhk] = useState('');
//     const [bathrooms, setBathrooms] = useState(0);
//     const [facing, setFacing] = useState('');
//     const [isForRent, setIsForRent] = useState(false);
//     const [error, setError] = useState('');
//     const token = localStorage.getItem('token'); 

//     const handleAddProperty = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(
//                 'https://localhost:7164/api/property/add',
//                 {
//                     title,
//                     description,
//                     location,
//                     builtUp,
//                     parking,
//                     price,
//                     bhk,
//                     bathrooms,
//                     facing,
//                     isForRent
//                 },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`, 
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
//             alert('Property added successfully!');
//         } catch (error) {
//             setError('Error adding property. Please try again.');
//         }
//     };

//     return (
//         <div className="add-property-form">
//             <h2>Add a New Property</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleAddProperty}>
//                 <div>
//                     <label>Title:</label>
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Description:</label>
//                     <textarea
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label>Location:</label>
//                     <input
//                         type="text"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>BuiltUp:</label>
//                     <input
//                         type="number"
//                         value={builtUp}
//                         onChange={(e) => setBuiltUp(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Parking:</label>
//                     <input
//                         type="text"
//                         value={parking}
//                         onChange={(e) => setParking(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Price:</label>
//                     <input
//                         type="number"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <lable>BHK Type:</lable>
//                     <input 
//                         type="text"
//                         value={bhk}
//                         onChange={(e) => setBhk(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Bathrooms:</label>
//                     <input
//                         type="number"
//                         value={bathrooms}
//                         onChange={(e) => setBathrooms(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Facing:</label>
//                     <input
//                         type="text"
//                         value={facing}
//                         onChange={(e) => setFacing(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Is For Rent:</label>
//                     <input
//                         type="checkbox"
//                         checked={isForRent}
//                         onChange={(e) => setIsForRent(e.target.checked)}
//                     />
//                 </div>
//                 <button type="submit">Add Property</button>
//             </form>
//         </div>
//     );
// };

// export default AddProperty;



import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    builtup: '',
    parking: '',
    price: '',
    bhk: '',
    bathrooms: '',
    facing: '',
    isForRent: false,
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('location', formData.location);
    form.append('builtup', formData.builtup);
    form.append('parking', formData.parking);
    form.append('price', formData.price);
    form.append('bhk', formData.bhk);
    form.append('bathrooms', formData.bathrooms);
    form.append('facing', formData.facing);
    form.append('isForRent', formData.isForRent);

    // Append each selected image file
    for (let i = 0; i < formData.images.length; i++) {
      form.append('images', formData.images[i]);
    }

    try {
      const response = await axios.post('https://localhost:7164/api/property/add', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Property added successfully');
    } catch (error) {
      console.error('Error adding property', error);
      alert('Failed to add property');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <input type="number" name="builtup" placeholder="Built Up Area" value={formData.builtup} onChange={handleChange} required />
      <input type="text" name="parking" placeholder="Parking" value={formData.parking} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="number" name="bhk" placeholder="BHK" value={formData.bhk} onChange={handleChange} required />
      <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required />
      <input type="text" name="facing" placeholder="Facing" value={formData.facing} onChange={handleChange} />
      <label>
        Is For Rent:
        <input type="checkbox" name="isForRent" checked={formData.isForRent} onChange={(e) => setFormData({ ...formData, isForRent: e.target.checked })} />
      </label>

      {/* File Input for Images */}
      <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} />

      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddProperty;
