import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";

function ProfilePage() {
  const { user, update } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        email,
      };

      await update(userData);
      alert("Perfil actualizado con éxito");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (user.id) {
        setUsername(user.username);
        setEmail(user.email);
      }
    };
    loadUser();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-gray-800 text-2xl font-bold mb-6 text-center">
          Profile
        </h2>
        <p></p>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
