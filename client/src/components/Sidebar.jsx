import React from "react";
<<<<<<< HEAD


export const Sidebar = ({categ,setSelCateg}) => {


=======
import myPhoto from "./myPhoto.jpg";

export const Sidebar = () => {
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
  return (
    <div className="sidebar mt-2 bg-light rounded d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center">
        <span className="m-2 p-2 text-center w-75 border-top border-bottom">
          Az oldalról
        </span>
<<<<<<< HEAD
        <p className="sidetext">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius, diam quis molestie interdum,
        justo est ultrices nisl, ac laoreet purus tortor nec lorem. Cras efficitur ac massa a tincidunt.
        Duis auctor laoreet imperdiet. Suspendisse ut ultricies turpis. Morbi imperdiet ante velit, eu
        aliquam felis porta id.
        </p>
      </div>
      <div className=" d-flex flex-column align-items-center">
        <span className="border-bottom pb-2">Étkezések szerinti kategóriák</span>
        <ul className="sidebarlist">
          <li onClick={()=>setSelCateg(0)}>Összes</li>
          {categ.map(obj=><li key={obj.categ_occ_id} onClick={()=>setSelCateg(obj.categ_occ_id)}>{obj.occasion}</li>)}
=======
        <img className="mt-2 p-2" src={myPhoto} alt="I" />
        <p className="sidetext">
          A portál létrehozójaként a Patika Kft hiteles egészségügyi és
          életmóddal kapcsolatos tartalmat és szolgáltatást nyújt digitális
          médián. Innovatív megoldásokkal igyekszünk a lehető legjobban
          kielégíteni látogatóink és partnereink igényeit. Célunk, hogy a hazai
          lakosság egészségtudatosságát és életszemléletét pozitív irányba
          befolyásoljuk. Mindezt egy lelkes és kreatív csapattal tesszük.
        </p>
      </div>
      <div className=" d-flex flex-column align-items-center">
        <span className="border-bottom pb-2">A választék</span>
        <ul className="sidebarlist">
          <li> Kategória01</li>
          <li> Kategória02</li>
          <li> Kategória03</li>
          <li> Kategória04</li>
          <li> Kategória05</li>
          <li> Kategória06</li>
          <li> Kategória07</li>
          <li> Kategória08</li>
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
        </ul>
      </div>
      <div className=" d-flex flex-column align-items-center">
        <span className="sidebarTitle">Kövess!</span>
        <div className="d-flex align-items-center justify-content-center mt-3">
          <i className="ms-2 fa-brands fa-facebook-square" role="button"></i>
          <i className="ms-2 fa-brands fa-pinterest-square" role="button"></i>
          <i className="ms-2 fa-brands fa-instagram-square" role="button"></i>
        </div>
      </div>
    </div>
  );
};
