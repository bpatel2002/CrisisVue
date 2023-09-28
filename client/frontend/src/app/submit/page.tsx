import React, { useState } from 'react';

function SubmitPage() {
  const [perpetrator, setPerpetrator] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [motive, setMotive] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      perpetrator,
      location,
      summary,
      date,
      motive,
      image,
      url,
    });
  };

  return (
    <div className="form-container">
      <h1>Submit Information</h1>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="url">Related URLs (comma-separated):</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default SubmitPage;

