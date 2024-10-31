import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../assets/Rolling@1x-1.0s-200px-200px.svg";
import Toastify from "toastify-js";

export default function ProfilePage({ url }) {
  const [profile, setProfile] = useState({});
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchProfile() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updatePhoto(e) {
    const formData = new FormData();
    formData.append("file", photo);
    e.preventDefault();
    try {
      const { data } = await axios.patch(`${url}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      console.log(data);

      setProfile(prevProfile => ({
        ...prevProfile,
        profilePicture: data.profilePicture,
      }));

      fetchProfile();
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <div className="h-[80vh] flex items-center justify-center">
        <div className=" bg-opacity-8 rounded-xl p-8 w-128 max-w-lg">
          <section className="bg-black mb-28"></section>
          {loading ? (
            <div className="flex justify-center items-center mb-6">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                  <img src={Loading} alt="Profile Picture" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mb-6">
              <div className="avatar">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                  <img src={profile.profilePicture || "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"} alt="Profile Picture" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          )}

          {/* Upload New Photo */}
          <form onSubmit={updatePhoto} className="flex flex-col items-center mt-4">
            <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} className="mb-3 file-input file-input-bordered w-full max-w-xs text-white bg-gray-800 border-gray-700" />
            <button type="submit" className="btn bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all ease-in-out duration-200 w-full">
              Update Photo Profile
            </button>
          </form>

          {/* Additional Information Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Profile Details</h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-400">Username:</span>
                <span className="text-gray-200">{profile.username || "John Doe"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-400">Email:</span>
                <span className="text-gray-200">{profile.email || "johndoe@example.com"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
