import { useState } from "react";

import Header from "../components/Header";
// import RenderImages from "../components/RenderImages";
import RenderImagesRetangle from "../components/RenderImagesRetangle";
import RealSideBar from "../components/RealSideBar";
import imgWhite from '../images/red-texture.jpg'
/* import img1 from "../images/img-test.jpg";
import imgRetangle from "../images/model1.jpg";
import model2 from "../images/Model2.jpg";
import model3 from "../images/model3.jpg"; */
import '../styles/pages/Home.css';

function Home() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const imagesDEMO = [
    {
      src: imgWhite,
      type: 'retangle',
      width: 359,
      height: 221,
      format: 1.5,
      textName: true,
      textNameHeight: 100,
      textNameFont: 'bold 28px Quicksand',
      textNameColor: '#fff',
      textNameAlign: 'center',
      textTitle: true,
      textTitleHeight: 85,
      textTitleFont: '12px Quicksand',
      textTitleColor: '#fff',
      textTitleAlign: 'center',
    },
    {
      src: imgWhite,
      type: 'square',
      width: 359,
      height: 320,
      format: 1,
      textName: false,
      textNameHeight: 100,
      textNameFont: 'bold 28px Quicksand',
      textNameColor: '#fff',
      textNameAlign: 'center',
      textTitle: false,
      textTitleHeight: 85,
      textTitleFont: '12px Quicksand',
      textTitleColor: '#fff',
      textTitleAlign: 'center',
    },
    {
      src: imgWhite,
      type: 'circle',
      centerX: 359 / 2,
      centerY: (359 - 123) / 2,
      rayArc: 85,
      endAngle: Math.PI * 2,
      textName: true,
      textNameHeight: 115,
      textNameWidth: 359 / 2,
      textNameFont: '20px Quicksand',
      textNameColor: 'Black',
      textNameAlign: 'center',
      textTitle: true,
      textTitleHeight: 100,
      textTitleWidth: 359 / 2,
      textTitleFont: '12px Quicksand',
      textTitleColor: 'Black',
      textTitleAlign: 'center',
    },
    {
      src: imgWhite,
      type: 'circle',
      centerX: 359 - 51.7 / 1.3,
      centerY: (359 - 129) / 2,
      rayArc: 145,
      endAngle: Math.PI * 2,
      textName: true,
      textNameHeight: 123,
      textNameWidth: 265,
      textNameFont: 'bold 20px Quicksand',
      textNameColor: 'White',
      textNameAlign: 'center',
      textTitle: true,
      textTitleHeight: 109,
      textTitleWidth: 265,
      textTitleFont: '12px Quicksand',
      textTitleColor: 'White',
      textTitleAlign: 'center',
      title: 'phone',
    },
  ];

  return (
    <div className="home">
      <Header onToggleSidebar={ handleToggleSidebar } />
      <RealSideBar isExpanded={ isSidebarExpanded }/>
      <RenderImagesRetangle images={ imagesDEMO }/>
    </div>
  );
}

export default Home;