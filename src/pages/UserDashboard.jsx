
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs, deleteBlog } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const res = await getBlogs();
      const myBlogs = res.data.filter((b) => b.authorId === user.id);
      setBlogs(myBlogs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (err) {
        alert("Something went wrong");
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          
          <div className="d-flex justify-content-between
            align-items-center mb-4">

            
            <div>
              <h3 className="fw-bold mb-0">My Blogs</h3>
              <p className="text-muted mb-0">
                Welcome back,{" "}
                <strong>{user?.name}</strong>
              </p>
            </div>

           
            <button
              onClick={() => navigate("/create")}
              className="btn btn-success">
              Create New Blog
            </button>

          </div>

          
          <div className="mb-4">
            <span className="badge bg-primary fs-6">
              Total Blogs: {blogs.length}
            </span>
          </div>

         
          {blogs.length === 0 ? (
            <div className="card shadow-sm text-center py-5">
              <div className="card-body">
                <h5 className="text-muted mb-3">
                  You have not created any blogs yet
                </h5>
                <p className="text-muted mb-4">
                  Start writing your first blog and share
                  your thoughts with the world
                </p>
                <button
                  onClick={() => navigate("/create")}
                  className="btn btn-success px-4">
                  Create Your First Blog
                </button>
              </div>
            </div>

          ) : (

        
            blogs.map((blog) => (
              <div key={blog.id} className="card shadow-sm mb-3">
                <div className="card-body">

                  <div className="d-flex justify-content-between
                    align-items-start">

      
      
                    <div className="flex-grow-1 me-3">

      
      
                      <span className="badge bg-primary mb-2">
                        {blog.category}
                      </span>
                      
                      <h5 className="card-title mb-1">
                        {blog.title}
                      </h5>
                      
                      <p className="text-muted small mb-2">
                        {blog.date}
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
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;