// CSVDataFetcher.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import './CSVDataFetcher.css'; // Rename the CSS file accordingly

const CSVDataFetcher = () => {
  const [csvData, setCsvData] = useState([]);
  const [email, setEmail] = useState('');
  const [selectedRecords, setSelectedRecords] = useState([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const proxyUrl = 'http://localhost:3001/fetch-csv';
        const response = await axios.get(proxyUrl);
        const csvString = response.data;

        Papa.parse(csvString, {
          header: true,
          complete: (result) => {
            setCsvData(result.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error.message);
          },
        });
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchCSVData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const matchingRecords = csvData.filter((row) => row.Email === email);
    setSelectedRecords(matchingRecords);
  };

  return (
    <div>
      <h1>CSV Data Fetching Example</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Email:{' '}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {selectedRecords.length > 0 ? (
        <div className="csv-table">
          <h2>Selected Records</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(selectedRecords[0]).map((column, columnIndex) => (
                  <th key={columnIndex}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedRecords.map((record, recordIndex) => (
                <tr key={recordIndex}>
                  {Object.values(record).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No records found for the specified email.</p>
      )}
    </div>
  );
};

export default CSVDataFetcher;
