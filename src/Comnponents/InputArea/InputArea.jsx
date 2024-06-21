import React, { useState, useEffect } from 'react';
import '../InputArea/InputArea.css';
import Select from 'react-select';
import { base_url } from '../../data';

const InputArea = ({ tab }) => {
  const [dataAll, setDataAll] = useState({
    image: "",
    title: "",
    message: "",
    url: "",
    user_name: []
  });

  const handleSelectChange = (selectedOptions) => {
    const selectedUsers = selectedOptions.map(option => option.value);
    setDataAll((prevState) => ({
      ...prevState,
      user_name: selectedUsers
    }));
  };

  const [usernames, setUsernames] = useState([]);

  const getUserNames = async () => {
    try {
      const response = await fetch(`${base_url}/users`);
      const data = await response.json();
      const formattedUsernames = data.username.map(user => ({
        value: user,
        label: user
      }));
      setUsernames(formattedUsernames);
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  };

  useEffect(() => {
    dataAllType();
  }, [tab]);

  useEffect(() => {
    getUserNames();
  }, []);

  const titleName = () => {
    if (tab === "all") {
      return "SEND PUSH NOTIFICATION & ALERT TO ALL USERS";
    } else if (tab === "users") {
      return "SEND PUSH NOTIFICATION & ALERT TO SELECTED USERS";
    } else {
      return "SEND PUSH NOTIFICATION TO NON REGISTERED APP USERS";
    }
  };

  const dataAllType = () => {
    setDataAll((prevState) => ({
      ...prevState,
      user_name: []
    }));
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return null;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${base_url}/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDataAll((prevState) => ({
          ...prevState,
          image: data.fileUrl
        }));
        return data.fileUrl;
      } else {
        alert('Failed to upload file.');
        return null;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataAll((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const uploadData = async (e) => {
    e.preventDefault();

    const uploadedImageUrl = await handleUpload();
    if (!uploadedImageUrl) return;

    const payload = {
      ...dataAll,
      image: uploadedImageUrl
    };

    try {
      let url = "";
      if (tab === "all") {
        url = `${base_url}/add-promotions`;
      } else if (tab === "users") {
        url = `${base_url}/add-promotions/selected`;
      } else {
        url = `${base_url}/add-promotions/unregister`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Notification sent successfully.');
      } else {
        alert('Failed to send notification.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Error sending notification.');
    }
  };

  const userOptions = usernames;

  return (
    <div className='input-area'>
      <div className="title">
        <h5>{titleName()}</h5>
      </div>
      <form onSubmit={uploadData}>
        <div className='single-input'>
          <label htmlFor="imageInput">Notification Image:</label>
          <label id='image-label' htmlFor="imageInput">
            <h5>{selectedFile ? selectedFile.name : 'Drop Files to Upload'}</h5>
          </label>
          <input type="file" id="imageInput" hidden onChange={handleFileChange} />
        </div>

        {tab === "users" && (
          <div className='single-input'>
            <label htmlFor="user_name"><span>*</span>Select Users:</label>
            <Select
              isMulti
              name="user_name"
              options={userOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectChange}
            />
          </div>
        )}

        <div className='single-input'>
          <label htmlFor="title"><span>*</span>Notification Title:</label>
          <input name="title" onChange={handleChange} type="text" id="title" placeholder="Notification Title" />
        </div>
        <div className='single-input'>
          <label htmlFor="message"><span>*</span>Message:</label>
          <input name="message" onChange={handleChange} type="text" id="message" placeholder="Notification Message" required />
        </div>
        <div className='single-input'>
          <label htmlFor="url">URL:</label>
          <input name="url" onChange={handleChange} type="text" id="url" placeholder="This Link will be Clicked when Clicked" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default InputArea;
