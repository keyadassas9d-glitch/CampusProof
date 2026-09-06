import { useEffect, useState } from "react";
import "../App.css";

function BrowseItems() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [itemType, setItemType] = useState("all");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get items from Django
  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/items/all/")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to load items");
        }

        return response.json();
      })
      .then((data) => {
        setItems(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load items. Make sure Django is running.");
        setLoading(false);
      });

  }, []);


  // Search + filters
  const filteredItems = items.filter((item) => {

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      itemType === "all" ||
      item.item_type === itemType;

    const matchesCategory =
      category === "all" ||
      item.category === category;

    const matchesLocation =
      location === "all" ||
      item.location === location;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesLocation
    );
  });


  // Format date
  const formatDate = (dateString) => {

    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };


  return (
    <div className="browse-page">

      {/* Navbar */}
      <nav className="dashboard-nav">

        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <a
          href="/dashboard"
          className="back-dashboard"
        >
          ← Dashboard
        </a>

      </nav>


      {/* Main Content */}
      <main className="browse-container">

        {/* Heading */}
        <div className="browse-heading">

          <span>LOST & FOUND</span>

          <h1>
            Browse Campus Items
          </h1>

          <p>
            Search through items reported lost or found
            around your campus.
          </p>

        </div>


        {/* Search */}
        <div className="browse-search">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search for an item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>
            Search
          </button>

        </div>


        {/* Filters */}
        <div className="browse-filters">

          <button
            className={`filter ${
              itemType === "all" ? "active" : ""
            }`}
            onClick={() => setItemType("all")}
          >
            All Items
          </button>

          <button
            className={`filter ${
              itemType === "lost" ? "active" : ""
            }`}
            onClick={() => setItemType("lost")}
          >
            🔴 Lost
          </button>

          <button
            className={`filter ${
              itemType === "found" ? "active" : ""
            }`}
            onClick={() => setItemType("found")}
          >
            🟢 Found
          </button>


          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="all">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Bags">
              Bags
            </option>

            <option value="Books & Stationery">
              Books & Stationery
            </option>

            <option value="Documents & ID">
              Documents & ID
            </option>

            <option value="Accessories">
              Accessories
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >

            <option value="all">
              All Locations
            </option>

            <option value="Library">
              Library
            </option>

            <option value="Cafeteria">
              Cafeteria
            </option>

            <option value="Classroom">
              Classroom
            </option>

            <option value="Hostel">
              Hostel
            </option>

            <option value="Parking Area">
              Parking Area
            </option>

            <option value="Sports Ground">
              Sports Ground
            </option>

            <option value="Campus Entrance">
              Campus Entrance
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {/* Results Header */}
        <div className="browse-results-header">

          <div>

            <span>
              RECENT ITEMS
            </span>

            <h2>
              Items reported on campus
            </h2>

          </div>

          <p>
            {filteredItems.length} items
          </p>

        </div>


        {/* Loading */}
        {loading && (
          <div className="empty-state">
            <h3>Loading items...</h3>
            <p>Please wait while we fetch the latest reports.</p>
          </div>
        )}


        {/* Error */}
        {error && (
          <div className="empty-state">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}


        {/* No items */}
        {!loading &&
          !error &&
          filteredItems.length === 0 && (
            <div className="empty-state">

              <h3>
                No items found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

            </div>
          )}


        {/* Items Grid */}
        {!loading &&
          !error &&
          filteredItems.length > 0 && (

            <div className="browse-grid">

              {filteredItems.map((item) => (

                <div
                  className="browse-card"
                  key={item.id}
                >

                  <div className="browse-image">

                    {item.item_type === "lost"
                      ? "🔴"
                      : "🟢"}

                    <span
                      className={`item-status ${
                        item.item_type
                      }`}
                    >
                      {item.item_type === "lost"
                        ? "Lost"
                        : "Found"}
                    </span>

                  </div>


                  <div className="browse-card-content">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    <div className="item-location">
                      📍 {item.location}
                    </div>

                    <div className="item-bottom">

                      <span>
                        {formatDate(item.date)}
                      </span>

                      <a
                        href={`/item/${item.id}`}
                      >
                        View Details →
                      </a>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

      </main>

    </div>
  );
}

export default BrowseItems;