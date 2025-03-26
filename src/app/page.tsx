"use client";

import { gql, useQuery } from "@apollo/client";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";
import { useEffect, useMemo, useState } from "react";
import CompareOverlay from "./components/CompareOverlay";
import Image from "next/image";
import Link from "next/link";

export interface CountryProps {
  name: {
    common: string;
  };
  capital: string;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
  area: number;
}

export interface CountriesCountryProps {
  countries: CountryProps[];
}

export default function Home() {
  // State for the search term entered in the search bar
  const [searchTerm, setSearchTerm] = useState("");

  // State for the filtered list of countries based on the search term
  const [filteredData, setFilteredData] = useState([]);

  // State for the list of selected countries for comparison
  const [selectedCountry, setSelectedCountry] = useState<CountryProps[]>([]);

  // State to control the visibility of the compare overlay
  const [active, setIsActive] = useState(false);

  // GraphQL query to fetch the list of countries
  const GET_COUNTRIES = gql`
    query GetCountries {
      countries @rest(type: "Country", path: "all", endpoint: "v1") {
        name {
          common
        }
        capital
        population
        flags {
          svg
          alt
        }
        area
      }
    }
  `;

  // Apollo useQuery hook to fetch data using the GraphQL query
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  // Memoized computation for filtering countries based on the search term
  const memoizedFilteredData = useMemo(() => {
    if (!loading && error == undefined && data.countries) {
      return data.countries.filter((country: CountryProps) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [searchTerm, data, loading, error]);

  // Effect to update the filtered data whenever the memoized filtered data changes
  useEffect(() => {
    setFilteredData(memoizedFilteredData);
  }, [memoizedFilteredData]);

  // Function to add a country to the selected countries list
  const addSelectedCountry = (country: CountryProps) => {
    setSelectedCountry((prev) => {
      return [...prev, country];
    });
  };

  // Function to remove a country from the selected countries list
  const removeSelectedCountry = (country: CountryProps) => {
    setSelectedCountry((prev) => {
      return prev.filter((name) => name.name.common !== country.name.common);
    });
  };

  // Display loading or error messages if applicable
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <main className="countries-table-container">
      {/* Search bar component for filtering countries */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Table displaying the list of countries */}
      <div className="table">
        <div className="table-heading">
          <div className="table-head-data flag">Flag</div>
          <div className="table-head-data country">Country</div>
          <div className="table-head-data capital">Capital</div>
          <div className="table-head-data population">Population</div>
          <div className="table-head-data area">Area</div>
          <div className="table-head-data"></div>
        </div>
        <div className="table-body">
          {/* Map through filtered data or fetched countries to render rows */}
          {(filteredData || data.countries).map((country: CountryProps) => (
            <div
              className={`table-items ${
                selectedCountry.some(
                  (selected) => selected.name.common === country.name.common
                )
                  ? "selected"
                  : ""
              }`}
              key={country.name.common}
              onClick={() => {
                if (
                  selectedCountry.some(
                    (selected) => selected.name.common === country.name.common
                  )
                ) {
                  removeSelectedCountry(country);
                } else {
                  addSelectedCountry(country);
                }
              }}
            >
              {/* Country flag */}
              <div className="table-data flag">
                <Image
                  src={country.flags.svg}
                  alt={country.flags.alt || country.name.common + " flag"}
                  width={50}
                  height={50}
                />
              </div>
              {/* Country name */}
              <div className="table-data country">
                {country.name.common || "N/A"}
              </div>
              {/* Country capital */}
              <div className="table-data capital">
                {country.capital || "N/A"}
              </div>
              {/* Country population */}
              <div className="table-data population">
                {country.population || "N/A"}
              </div>
              {/* Country area */}
              <div className="table-data area">{country.area || "N/A"}</div>
              {/* Link to view more details about the country */}
              <div className="table-data view">
                <Link href={`country/${country.name.common}`}>View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button to trigger the compare overlay */}
      <Button
        text="Compare"
        action={setIsActive}
        selectedCountries={selectedCountry}
      />

      {/* Overlay component for comparing selected countries */}
      <CompareOverlay
        selectedCountry={selectedCountry}
        active={active}
        setIsActive={setIsActive}
      />
    </main>
  );
}
