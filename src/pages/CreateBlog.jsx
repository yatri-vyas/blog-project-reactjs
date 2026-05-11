
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CreateBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title || !description || !category) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newBlog = {
        title,
        description,
        category,
        authorId: user.id,
        authorName: user.name,
        date: new Date().toLocaleDateString()
      };

      await createBlog(newBlog);
      alert("Blog created successfully!");
      navigate("/");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-sm p-4">

            <h2 className="fw-bold mb-1"> Create New Blog</h2>
            <p className="text-muted mb-4">
              Fill in the details below to publish your blog
            </p>

            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}

            <div className="alert alert-secondary py-2 mb-4">
               Posting as <strong>{user?.name}</strong>
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
                <option value="Travel"> Travel</option>
                <option value="Food"> Food</option>
                <option value="Lifestyle"> Lifestyle</option>
                <option value="Education">Education</option>
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
                className="btn btn-outline-secondary w-50">
                Cancel
              </button>
              
              <button
                onClick={handleCreate}
                className="btn btn-success w-50"
                disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"
                      role="status" />
                    Publishing...
                  </>
                ) : (
                  " Publish Blog"
                )}
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;