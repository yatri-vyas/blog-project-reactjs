
import { useState, useEffect } from "react";
import { getBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "All" || blog.category === category;
    return matchSearch && matchCategory;
  });

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  if (loading) return <Loader />;

  return (
    <div className="container py-5">

      <div className="text-center mb-4">
        <h2 className="fw-bold"> All Blogs</h2>
        <p className="text-muted">
          Showing {filteredBlogs.length} of {blogs.length} blogs
        </p>
      </div>

      <div className="row justify-content-center mb-3">
        <div className="col-md-6">
          <div className="input-group">
            
            <input
              type="text"
              className="form-control"
              placeholder="Search blogs by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`btn rounded-pill me-2 mb-2 ${
              category === cat
                ? "btn-dark"           
                : "btn-outline-dark"  
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {filteredBlogs.length === 0 ? (

        <div className="text-center mt-5">
          <p className="fs-1"></p>
          <h5 className="text-muted">No blogs found</h5>
          {search && (
            <p className="text-muted">
              No results for <strong>"{search}"</strong>
            </p>
          )}
          {category !== "All" && (
            <button
              className="btn btn-outline-dark mt-2"
              onClick={() => setCategory("All")}>
              Show All Blogs
            </button>
          )}
        </div>

      ) : (

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredBlogs.map((blog) => (
            <div className="col" key={blog.id}>
              <BlogCard
                blog={blog}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>

      )}

    </div>
  );
};

export default Home;