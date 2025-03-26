interface Props {
  searchTerm: string; // The current search term entered by the user
  setSearchTerm: (searchTerm: string) => void; // Function to update the search term
}

export default function SearchBar({ searchTerm, setSearchTerm }: Props) {
  return (
    <div className="search-bar">
      <input
        name="search-country"
        id="search-country"
        title="Search country..."
        placeholder="Search country..."
        value={searchTerm} // Binds the input value to the searchTerm prop
        onChange={(e) => setSearchTerm(e.target.value)} // Updates the searchTerm when the input changes
      ></input>
    </div>
  );
}
