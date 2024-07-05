import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {  Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../css/home.css";
import { Avatar, Card } from "antd";
import Layout from "../Components/layout/Layout";
import { useAuth } from "../Context/auth";

function Home({ colors }) {
  const { Meta } = Card;
  const color = colors;
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const initialLiked=likedItems.includes(items._id)
  const navigate = useNavigate();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState();
  const [cookies, removeCookie] = useCookies([]);
  const [datavalue, setValueData] = useState([]);
  const [userId, setuserId] = useState();
  const [submitSuccess, setsubmitSuccess] = useState(false);
  const[auth,setAuth]=useAuth()
  sessionStorage.setItem("userid", userId);
  cookies.token = localStorage.getItem("utoken");
 
  useEffect(() => {
    const verifyCookies = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "https://foot-trucks-react-js.onrender.com",
        {},
        { withCredentials: true }
      );
      const { status } = data;
      setuserId(data.user._id);
      setValueData([data.user]);
      return status
        ? toast(`hello`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookies();
  }, [cookies, navigate, removeCookie]);
  useEffect(() => {
    // Fetch items from the backend
    axios.get('https://foot-trucks-react-js.onrender.com/items')
      .then(response =>{ 
        setItems(response.data.items)
      });
    // Fetch liked items for the user
    axios.get(`https://foot-trucks-react-js.onrender.com/user-likes/${userId}`)
      .then(response => {
        const likedItemIds = response.data.details.map(like => like.vendorId);
        setLikedItems(likedItemIds);
      });
  }, [userId]);
  // const Logout = () => {
  //   removeCookie("token");
  //   navigate("/");
  //   setAuth({
  //     ...auth,
  //     user:null,
  //     token:''
  //   })
  //   localStorage.removeItem('auth')
  //   localStorage.clear("utoken");
  // };
  const accountDetails = () => {
    setsubmitSuccess(true);
  };
  const handleUserUpdate = (id) => {
    navigate("/user/update", sessionStorage.setItem("uupdateid", id));
  };
  const handleUserDelete = (id) => {
    axios
      .delete(`https://foot-trucks-react-js.onrender.com/user/delete/${id}`)
      .then((user) => {
        window.location.reload();
        Logout();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClicks = (vendorId) => {
    console.log(userId, vendorId);
    axios
      .post(`https://foot-trucks-react-js.onrender.com/like/${userId}/${vendorId}`)
      .then((res) => {
        localStorage.setItem("like", res.data.status);
        setLiked(!liked);
        setLikeCount(res.data.likeCount);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title={'Home'}>
    <div>
      {/* User Profile Start */}
      <div className="user-data">
        {submitSuccess && (
          <div className="user-profile-container">
            <div className="users-profile">
              {datavalue.map((user) => (
                <div className="user-profile">
                  <div
                    className="user-profile-name"
                    style={{ background: color }}
                  >
                    <div className="user-first-letter">{user.name[0]}</div>
                  </div>
                  <ul className="user-profile-details">
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.phone}</li>
                  </ul>
                  <div className="btns d-flex justify-content-between p-2">
                    <Button
                      className="edit-btn button-update"
                      variant="success"
                      onClick={(e) => handleUserUpdate(user._id)}
                    >
                      <i>
                        <MdModeEdit className="edit-icon" />
                      </i>
                      <i>Edit</i>
                    </Button>
                    <Button
                      className="edit-btn button-update"
                      variant="success"
                      onClick={(e) => handleUserDelete(user._id)}
                    >
                      <i>
                        <MdDelete className="edit-icon" />
                      </i>
                      <i>Delete</i>
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant=""
                className="button-close"
                onClick={() => setsubmitSuccess(false)}
              >
                <IoClose />
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* User Profile End */}
      {/* Product Card Start  */}
      <section id="card">
        {items.map((vendor) => (
          <Card
            style={{
              width: 300
              // display:'flex'
            }}
            key={vendor._id}
            cover={
              <img
                alt="example"
                src={`https://foot-trucks-react-js.onrender.com/images/${vendor.menuImage}`}
                style={{ height: "300px" }}
              />
            }
            actions={[
              <div
                  onClick={() => handleClicks(vendor._id)}
                  className="like-header">
                    {liked ? (<CiHeart
                  className="unlike"
                />) : (
                <FcLike className="like" /> )}
                  <p>
                    {vendor.likeCount}
                    {vendor.likeCount === 1 ? "like" : "likes"}
                  </p>
                </div>
              ,
              <span
                onClick={(e) =>
                  navigate(`/productfulldetail/${vendor._id}/${cookies.token}`)
                }
              >
                more
              </span>,
            ]}
          >
            <Meta
              avatar={
                <Avatar
                  src={`https://foot-trucks-react-js.onrender.com/images/${vendor.shopImage}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              }
              title={vendor.shopname}
              description={vendor.shopaddress}
              style={{ overflow: "visible" }}
            />
          </Card>
        ))}
      </section>
      {/* Product Card End */}
    </div>
    </Layout>
  );
}

export default Home;
