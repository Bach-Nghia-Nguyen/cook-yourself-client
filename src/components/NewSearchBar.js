import React from "react";
import search_icon from "../images/icons/search_black_24dp.svg";

const NewSearchBar = ({
  search_keyword,
  handle_keyword_change,
  handleSearchSubmit,
}) => {
  return (
    <form className="search-container" onSubmit={handleSearchSubmit}>
      <table className="elements-container">
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Search recipe"
                className="search-input"
                value={search_keyword}
                onChange={handle_keyword_change}
              />
            </td>

            <td>
              <button type="submit" className="search-button">
                <img src={search_icon} alt="search" className="search-icon" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default NewSearchBar;
