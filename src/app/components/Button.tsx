import { CountryProps } from "../page";

interface Props {
  text: string; // The text to display on the button
  type?: "button" | "submit" | "reset"; // The type of the button, defaults to "button"
  action: (active: boolean) => void; // Callback function triggered on button click
  selectedCountries?: CountryProps[]; // Optional array of selected countries
}

export default function Button({
  text,
  type = "button", // Default button type is "button"
  action,
  selectedCountries,
}: Props) {
  return (
    <button
      type={type} // Set the button type
      onClick={() => action(true)} // Trigger the action callback with `true` when clicked
      disabled={(selectedCountries?.length ?? 0) < 2} // Disable the button if fewer than 2 countries are selected
      className={`compare-btn ${
        (selectedCountries?.length ?? 0) < 2 ? "disabled" : "" // Add "disabled" class if selected countries are fewer than 2
      }`}
    >
      {text}
    </button>
  );
}
