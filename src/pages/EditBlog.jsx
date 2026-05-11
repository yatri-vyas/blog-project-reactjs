
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await getBlogById(id);
      const blog = res.data;

      if (user.role !== "admin" && blog.authorId !== user.id) {
        alert("You cannot edit this blog");
        navigate("/");
        return;
      }

      setTitle(blog.title);
      setDescription(blog.description);
      setCategory(blog.category);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title || !description || !category) {
      setError("Please fill all fields");
      setSuccess("");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      await updateBlog(id, { title, description, category });

      setSuccess("Blog updated successfully!");
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-sm p-4">


            <h2 className="fw-bold mb-1"> Edit Blog</h2>
            <p className="text-muted mb-4">
              Update your blog details below
            </p>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                 {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2" role="alert">
                 {success}
              </div>
            )}

            <div className="alert alert-warning py-2 mb-4">
               Editing as <strong>{user?.name}</strong>
              <span className={`badge ms-2
                ${user?.role === "admin" ? "bg-danger" : "bg-success"}`}>
                {user?.role}
              </span>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Blog Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Category
              </label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="">-- Select Category --</option>
                <option value="Tech"> Tech</option>
                <option value="Travel">Travel</option>
                <option value="Food"> Food</option>
                <option value="Lifestyle"> Lifestyle</option>
                <option value="Education"> Education</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Description
              </label>
              <textarea
                className="form-control"
                placeholder="Write your blog content here..."
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2">

              <button
                onClick={() => navigate("/")}
                className="btn btn-outline-secondary w-50"
                disabled={updating}>
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="btn btn-warning text-white w-50"
                disabled={updating}>
                {updating ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Updating...
                  </>
                ) : (
                  "Update Blog"
                )}
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;