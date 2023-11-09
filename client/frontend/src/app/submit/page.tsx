"use client";
import React, { ChangeEvent, useState } from "react";
import "./SubmitPage.css";
import axios from "axios";
import {auth} from '../firebase';
import validator from "validator";
import {useRouter} from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AdditionalField {
  key: string;
  value: string;
}

function SubmitPage() {
  const user = auth.currentUser;
  const router = useRouter();
  if (!user){
    router.push('/login');
  } 
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [perpetrator, setPerpetrator] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [motive, setMotive] = useState("");
  const [casualties, setCasualties] = useState("");
  const [urls, setUrls] = useState("");
  const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>(
    []
  );

  //url verify function
  const [urlValidationErrors, setUrlValidationErrors] = useState<string[]>();

  const validateUrls = (inputUrls: string) => {
    const urls = inputUrls.split(",").map((url) => url.trim());
    const validationErrors: string[] = [];

    urls.forEach((url) => {
      if (!validator.isURL(url)) {
        validationErrors.push(`Invalid URL: ${url}`);
      }
    });

    setUrlValidationErrors(validationErrors);

    return validationErrors.length === 0;
  };

  const handleAdditionalFieldChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...additionalFields];
    values[index][event.target.name as "key" | "value"] = event.target.value;
    setAdditionalFields(values);
  };

  const addAdditionalField = () => {
    setAdditionalFields([...additionalFields, { key: "", value: "" }]);
  };

  const removeAdditionalField = (index: number) => {
    const values = [...additionalFields];
    values.splice(index, 1);
    setAdditionalFields(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user){
      toast.error("User is not logged in!");
    } else {

      const token = await user.getIdToken();

      const additionalFieldsObject = additionalFields.reduce((obj, item) => {
        if (item.key) obj[item.key] = item.value;
        return obj;
      }, {} as Record<string, string>);

      // Create a data object with the form data
      const formData = {
        place:place,
        name: name,
        perpetrator: perpetrator,
        summary: summary,
        date: date,
        location: location,
        motive: motive,
        casualties: casualties,
        urls: urls,
        additional_fields: additionalFieldsObject,
      };

      // verify url
      const isUrlValid = validateUrls(urls);

      if (!isUrlValid) {
        // Display an error message or take appropriate action for invalid URLs
        toast.error("Invalid URLs. Please check and correct the URLs.");
        return;
      }
      try {
        // Make a POST request using Axios
        const response = await axios.post(
          "http://127.0.0.1:5000/events",
          formData, {headers: {
            'Authorization': `Bearer ${token}`
          }}
        );

        // Handle the response (you can display a success message, reset the form, etc.)
        toast.success("Submission successful!");

        // Clear the form fields after successful submission (optional)
        setName("");
        setPerpetrator("");
        setSummary("");
        setDate("");
        setLocation("");
        setMotive("");
        setCasualties("");
        setAdditionalFields([{ key: "", value: "" }]);
        setUrls("");
      } catch (error) {
        // Handle errors (you can display an error message to the user)
        toast.error("Submission error:" + error);
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Submit Information</h1>
      <ToastContainer/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Shooting Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="perpetrator">Perpetrator:</label>
        <input
          type="text"
          id="perpetrator"
          name="perpetrator"
          value={perpetrator}
          onChange={(e) => setPerpetrator(e.target.value)}
          required
        />
        <br />

        <label htmlFor="summary">Summary:</label>
        <textarea
          id="summary"
          name="summary"
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <br />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <label htmlFor="location">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
        />
        <br />

        <label htmlFor="location">City, State:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />

        <label htmlFor="motive">Motive:</label>
        <input
          type="text"
          id="motive"
          name="motive"
          value={motive}
          onChange={(e) => setMotive(e.target.value)}
          required
        />
        <br />

        <label htmlFor="casualties">Casualties:</label>
        <input
          type="text"
          id="casualties"
          name="casualties"
          value={casualties}
          onChange={(e) => setCasualties(e.target.value)}
          required
        />
        <br />

        <label htmlFor="urls">Related URLs (comma-separated):</label>
        <input
          type="text"
          id="urls"
          name="urls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
        <br />

        <div>
          <label>Additional Fields:</label>
          {additionalFields.map((field, index) => (
            <div key={index} className="additional-field">
              <input
                type="text"
                name="key"
                placeholder="Key"
                value={field.key}
                onChange={(e) => handleAdditionalFieldChange(index, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={field.value}
                onChange={(e) => handleAdditionalFieldChange(index, e)}
              />
              <button
                type="button"
                onClick={() => removeAdditionalField(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addAdditionalField}>
            Add Additional Field
          </button>
        </div>
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SubmitPage;
