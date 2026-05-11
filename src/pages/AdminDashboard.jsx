
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs, deleteBlog, getUsers } from "../services/api";
import Loader from "../components/Loader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [blogsRes, usersRes] = await Promise.all([
        getBlogs(),
        getUsers()
      ]);
      setBlogs(blogsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this blog?")) {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container py-4">

      
      <h2 className="fw-bold mb-4"> Admin Dashboard</h2>

  
      <div className="row g-3 mb-4">

        
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow-sm text-center p-3">
            <h2 className="fw-bold">{blogs.length}</h2>
            <p className="mb-0">Total Blogs</p>
          </div>
        </div>

        
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-sm text-center p-3">
            <h2 className="fw-bold">
              {users.filter((u) => u.role === "user").length}
            </h2>
            <p className="mb-0">Total Users</p>
          </div>
        </div>

        
        <div className="col-md-4">
          <div className="card text-white bg-danger shadow-sm text-center p-3">
            <h2 className="fw-bold">
              {users.filter((u) => u.role === "admin").length}
            </h2>
            <p className="mb-0">Total Admins</p>
          </div>
        </div>

      </div>

      <h4 className="fw-bold mb-3"> All Blogs</h4>

      {blogs.length === 0 ? (
        <div className="alert alert-info">No blogs found.</div>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="card shadow-sm mb-3">
            <div className="card-body d-flex 
              justify-content-between align-items-start">

           
              <div className="flex-grow-1 me-3">

             
                <span className="badge bg-primary mb-2">
                  {blog.category}
                </span>

                
                <h5 className="card-title mb-1">{blog.title}</h5>

                
                <p className="text-muted small mb-1">
                   {blog.authorName} |  {blog.date}
                </p>

    
                <p className="card-text text-secondary" 
                  style={{ fontSize: "14px" }}>
                  {blog.description?.substring(0, 120)}...
                </p>
              </div>

              <div className="d-flex flex-column gap-2">

                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="btn btn-dark btn-sm">
                   View
                </button>

                <button
                  onClick={() => navigate(`/edit/${blog.id}`)}
                  className="btn btn-warning btn-sm text-white">
                   Edit
                </button>

                <button
                  onClick={() => handleDelete(blog.id)}
                  className="btn btn-danger btn-sm">
                   Delete
                </button>

              </div>
            </div>
          </div>
        ))
      )}

      <h4 className="fw-bold mt-5 mb-3">👥 All Users</h4>

      {users.filter((u) => u.role === "user").length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        users
          .filter((u) => u.role === "user")
          .map((u) => (
            <div key={u.id} className="card shadow-sm mb-2">
              <div className="card-body d-flex 
                justify-content-between align-items-center py-2">

                <div>
                  <strong>{u.name}</strong>
                  <p className="text-muted mb-0 small">{u.email}</p>
                </div>

                <span className="badge bg-success">
                  {u.role}
                </span>

              </div>
            </div>
          ))
      )}

    </div>
  );
};

export default AdminDashboard;