"use client";
import React, { ChangeEvent, useState } from "react";
import "./SubmitPage.css";
import axios from "axios";

interface AdditionalField {
  key: string;
  value: string;
}

function SubmitPage() {
  const [name, setName] = useState("");
  const [perpetrator, setPerpetrator] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [motive, setMotive] = useState("");
  const [casualties, setCasualties] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [urls, setUrls] = useState("");
  const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>(
    []
  );

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

    const additionalFieldsObject = additionalFields.reduce((obj, item) => {
      if (item.key) obj[item.key] = item.value;
      return obj;
    }, {} as Record<string, string>);

    // Create a data object with the form data
    const formData = {
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

    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://127.0.0.1:5000/events",
        formData
      );

      // Handle the response (you can display a success message, reset the form, etc.)
      console.log("Submission successful:", response.data);

      // Clear the form fields after successful submission (optional)
      setName("");
      setPerpetrator("");
      setSummary("");
      setDate("");
      setLocation("");
      setMotive("");
      setCasualties("");
      setImage(null);
      setAdditionalFields([{ key: "", value: "" }]);
      setUrls("");
    } catch (error) {
      // Handle errors (you can display an error message to the user)
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Submit Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name:</label>
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

        <label htmlFor="location">Location:</label>
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

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
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
