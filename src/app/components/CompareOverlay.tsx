import Image from "next/image";
import { CountryProps } from "../page";
import closeIcon from "../../../public/close.svg";

interface Props {
  selectedCountry: CountryProps[]; // Array of selected countries to compare
  active: boolean; // Determines if the overlay is active or not
  setIsActive: (active: boolean) => void; // Function to toggle the overlay's active state
}

export default function CompareOverlay({
  selectedCountry,
  active,
  setIsActive,
}: Props) {
  return (
    <div className={`compare-overlay ${active ? "active" : ""}`}>
      {/* Close button to deactivate the overlay */}
      <Image
        src={closeIcon}
        alt="Close icon"
        className="close-icon"
        onClick={() => setIsActive(false)}
      />
      <h1>Compare Countries</h1>
      <div className="compare-countries">
        {/* Iterate over selected countries and display their details */}
        {selectedCountry.map((country, index) => (
          <div className="country" key={index}>
            <h2>{country.name.common}</h2>
            {/* Display country flag */}
            <Image
              src={country.flags.svg}
              alt={country.name.common}
              width={100}
              height={100}
            ></Image>
            <div className="details">
              {/* Display country-specific details */}
              <p>Population: {country.population}</p>
              <p>Area: {country.area}</p>
              <p>GDP: N/A</p> {/* Placeholder for GDP */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
