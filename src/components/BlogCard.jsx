import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteBlog } from "../services/api";

const BlogCard = ({ blog, onDelete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const canEditDelete = () => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (blog.authorId === user.id) return true;
    return false;
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteBlog(blog.id);
        onDelete(blog.id);
      } catch (err) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="card h-100 shadow-sm" style={{ width: "300px" }}>
      <div className="card-body d-flex flex-column">

        <span className="badge bg-primary mb-2" 
          style={{ width: "fit-content" }}>
          {blog.category}
        </span>

        <h5 className="card-title">{blog.title}</h5>

        <p className="card-text text-muted" style={{ fontSize: "14px" }}>
          {blog.description?.substring(0, 100)}...
        </p>

        <small className="text-secondary mb-3">
           {blog.authorName} |  {blog.date}
        </small>

        <button
          onClick={() => navigate(`/blog/${blog.id}`)}
          className="btn btn-dark w-100 mb-2">
          Read More
        </button>

        {canEditDelete() && (
          <div className="d-flex gap-2">
            <button
              onClick={() => navigate(`/edit/${blog.id}`)}
              className="btn btn-warning w-50 text-white">
               Edit
            </button>

            <button
              onClick={handleDelete}
              className="btn btn-danger w-50">
               Delete
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogCard;