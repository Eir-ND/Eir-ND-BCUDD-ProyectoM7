import { useAuth } from "../Hooks/useAuth.js";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { login, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      login(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-gray-800 text-2xl font-bold mb-6 text-center">
          Login
        </h2>
        {loginErrors.map((error, i) => (
          <p className="bg-red-500 p-2 mb-1 text-white rounded-lg" key={i}>
            {error}
          </p>
        ))}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Write your email"
              value={formData.email}
              onChange={handleChange}
              className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Write your password"
              value={formData.password}
              onChange={handleChange}
              className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="flex gap-x-2 pt-2 justify-between text-gray-500">
          Dont have an account?{" "}
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useAuth } from "../Hooks/useAuth.js";
// import { Link, useNavigate } from "react-router-dom";

// function LoginPage() {
//   const { login, isAuthenticated, errors: loginErrors = [] } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/products");
//     }
//   }, [isAuthenticated, navigate]);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.email.trim()) {
//       tempErrors.email = "Email is required.";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       tempErrors.email = "Email is invalid.";
//     }
//     if (!formData.password) {
//       tempErrors.password = "Password is required.";
//     } else if (formData.password.length < 6) {
//       tempErrors.password = "Password must be at least 6 characters.";
//     }
//     return tempErrors;
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const tempErrors = validate();
//     if (Object.keys(tempErrors).length > 0) {
//       setErrors(tempErrors);
//     } else {
//       setErrors({});
//       try {
//         const result = await login(formData);

//         if (result?.success) {
//           console.log("Login successful:", result);
//         } else {
//           console.log("Login failed:", result);
//         }
//       } catch (error) {
//         // Aquí añadimos un mensaje detallado del error
//         console.error(
//           "Login failed with error:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-gray-800 text-2xl font-bold mb-6 text-center">
//           Login
//         </h2>
//         {loginErrors.length > 0 &&
//           loginErrors.map((error, i) => (
//             <div className="bg-red-500 p-2 mb-1 text-white rounded-lg" key={i}>
//               {error}
//             </div>
//           ))}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>
//           <div>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Login
//           </button>
//         </form>
//         <p className="flex gap-x-2 pt-2 justify-between text-gray-500">
//           Dont have an account? <Link to="/register">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

export default LoginPage;
