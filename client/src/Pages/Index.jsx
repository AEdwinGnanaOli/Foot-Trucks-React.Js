import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/layout/Layout";
import axios from "axios";

function Index() {
  const navigate = useNavigate();
  

 
  return (
    <Layout title={"Foot Trucks"}>
      <div className="index-header">
        {/* <!-- Start Hero Section --> */}
        <div className="hero " id="#home">
          <Container>
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt">
                  <h1>A Journey of Flavors</h1>
                  <p className="mb-4">
                    Food trucks have revolutionized dining, bringing gourmet
                    meals to every corner. This journey isn't just about the
                    food. it's about the stories and creativity behind each
                    truck. With vibrant designs and diverse menus, food trucks
                    invite you to explore new flavors and experiences.
                  </p>
                  <div className="">
                    <Button
                      className="hero-btn-user"
                      variant="success"
                      onClick={(e) => navigate("/signup")}
                    >
                     Start Journey 
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-lg-7"></div>
            </div>
          </Container>
        </div>
        {/* <!-- End Hero Section --> */}
      </div>
    </Layout>
  );
}

export default Index;
