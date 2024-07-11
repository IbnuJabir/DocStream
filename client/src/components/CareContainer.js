import { useCallback } from "react";
import "../style/CareContainer.css";
import { FaArrowRightLong } from "react-icons/fa6";

const CareContainer = () => {
  const onLinkButtonContainerClick = useCallback(() => {
    // Navigate to "About us" page
  }, []);

  return (
    <div className="care-container">
      <div className="text-content">
        <h1 className="subtitle">Welcome to DocStream</h1>
        <h2 className="title">A Great Place to Receive Care</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          placerat scelerisque tortor ornare ornare. Convallis felis vitae
          tortor augue. Velit nascetur proin massa in. Consequat faucibus
          porttitor enim et.
        </p>
        <div className="link_button" onClick={onLinkButtonContainerClick}>
          Learn More<FaArrowRightLong />
        </div>
      </div>
    </div>
    
  );
};

export default CareContainer;
