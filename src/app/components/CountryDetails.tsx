"use client";

import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

export default function CountryDetails({ slug }: { slug: string }) {
  // GraphQL query to fetch country details using the provided slug
  const GET_COUNTRY = gql`
    query GetCountry {
      country
        @rest(
          type: "Country"
          path: "${slug}?fullText=true"
          endpoint: "v2"
        ) {
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
        currencies
        subregion
        continents
        languages
        timezones
      }
    }
  `;

  // Apollo useQuery hook to execute the GraphQL query and fetch data
  const { loading, error, data } = useQuery(GET_COUNTRY);

  // Extract the first country object from the response data
  const country = data?.country[0];

  // Display loading state while the query is in progress
  if (loading) return "Loading...";

  // Display error message if the query fails
  if (error) return `Error! ${error.message}`;

  return (
    <div className="country-details">
      <div className="header">
        {/* Display the country's flag */}
        <Image
          src={country.flags.svg}
          alt={country.flags.alt || country.name.common + " flag"}
          width={300}
          height={300}
        />
        <div className="header-details">
          {/* Display the country's name, area, and population */}
          <h1>{country.name.common || "N/A"}</h1>
          <p>Area: {country.area || "N/A"}</p>
          <p>Population: {country.population || "N/A"}</p>
        </div>
      </div>
      <div className="details-container">
        {/* Display the country's capital */}
        <div className="detail">
          <p className="title">Capital</p>
          <p>{country.capital || "N/A"}</p>
        </div>
        {/* Display the country's currencies */}
        <div className="detail">
          <p className="title">Currency</p>
          <p>
            {Object.values(country.currencies).map(
              (currency: any) => `${currency.name} (${currency.symbol})`
            ) || "N/A"}
          </p>
        </div>
        {/* Display the continents the country belongs to */}
        <div className="detail">
          <p className="title">Continent(s)</p>
          <p>{country.continents.join(", ") || "N/A"}</p>
        </div>
        {/* Display the languages spoken in the country */}
        <div className="detail">
          <p className="title">Language(s)</p>
          <p>
            {Object.values(country.languages)
              .map((language: any) => `${language}`)
              .join(", ") || "N/A"}
          </p>
        </div>
        {/* Display the timezones of the country */}
        <div className="detail">
          <p className="title">Timezone(s)</p>
          <p>{country.timezones.join(", ") || "N/A"}</p>
        </div>
        {/* Display the sub-region of the country */}
        <div className="detail">
          <p className="title">Sub-region</p>
          <p>{country.subregion || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
