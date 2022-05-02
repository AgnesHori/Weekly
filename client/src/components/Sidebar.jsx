import React from "react";


export const Sidebar = ({categ,setSelCateg}) => {
  return (
    <div className="sidebar mt-2 bg-light rounded d-flex flex-column align-items-center">
      <div className=" d-flex flex-column align-items-center">
        <span className="border-bottom pb-2">Étkezések szerinti kategóriák</span>
        <ul className="sidebarlist">
          <li onClick={()=>setSelCateg(0)}>Összes</li>
          {categ.map(obj=><li key={obj.categ_occ_id} onClick={()=>setSelCateg(obj.categ_occ_id)}>{obj.occasion}</li>)}
        </ul>
      </div>
    </div>
  );
};

