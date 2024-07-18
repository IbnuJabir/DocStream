import React, { useEffect } from "react";
import "./experts.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../../state/doctorSlice";

function Experts() {
  const { doctors, isLoading, error } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="experts">
      <h1>Meet Our Experience Doctors</h1>
      <div className="doctors_container">
        <div className="doctors_grid">
          {doctors.map((doc, index) => (
            <div className="doctors_card" key={index}>
              <img
                src={
                  doc.avatar
                    ? URL.createObjectURL(
                        new Blob([Int8Array.from(doc.avatar.data.data)], {
                          type: doc.avatar.contentType,
                        })
                      )
                    : "default-avatar.png"
                }
                alt="Doctor's image"
              />
              <div className="doc_description">
                <p className="doc_name">{`${doc.firstName} ${doc.lastName}`}</p>
                <div className="sub_desc">
                  <p className="doc_desc">{doc.docDepartment}</p>
                  <a href="#">Learn More...</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experts;
