
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById } from "../services/api";
import Loader from "../components/Loader";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await getBlogById(id);
      setBlog(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!blog) return (
    <div className="container text-center mt-5">
      <h2 className="text-muted">Blog not found</h2>
      <button
        className="btn btn-dark mt-3"
        onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm p-4">

            <div className="mb-3">
              <span className="badge bg-primary fs-6">
                {blog.category}
              </span>
            </div>

            <h1 className="fw-bold mb-3">{blog.title}</h1>

            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="text-muted">
                By <strong className="text-dark">
                  {blog.authorName}
                </strong>
              </span>
              <span className="text-muted">|</span>
              <span className="text-muted"> {blog.date}</span>
            </div>

            <hr />

            <p className="text-secondary lh-lg fs-6 mt-3">
              {blog.description}
            </p>

            <hr />

            <div className="mt-3">
              <button
                onClick={() => navigate("/")}
                className="btn btn-dark px-4">
                ← Back to Home
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;