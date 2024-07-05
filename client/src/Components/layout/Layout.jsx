import React from "react";
// import Footer from '../Footer'
import Header from "../Header";
import { Helmet } from "react-helmet";
import { keyframes } from "styled-components";
import Footer from "../Footer";
function Layout({ children, title, description, keyword, author }) {
  return (
    <div>
      <Header />
      <div className="main" style={{minHeight:'80vh'}}>{children}</div>
      <Footer/>
      <Helmet>
      
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
          <meta name="author" content={author}/>
          <title>{title}</title>
      </Helmet>
     
    </div>
  );
}
Layout.defaultProps={
  title:'Food Truck-App',
  keyword:'HTML,CSS,REACT,JAVASCRIPT,NODE.JS MERN STACK',
  author:'Edwin'
}

export default Layout;
