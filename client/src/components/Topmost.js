import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../style/Topmost.css";

const Topmost = ({
  className = "",
  topmostPosition,
  topmostTop,
  topmostLeft,
}) => {
  const topmostStyle = useMemo(() => {
    return {
      position: topmostPosition,
      top: topmostTop,
      left: topmostLeft,
    };
  }, [topmostPosition, topmostTop, topmostLeft]);

  const navigate = useNavigate();

  const onMeddicalTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="topmost">
      <div className="meddical" onClick={onMeddicalTextClick}>
        <span>Doc</span>
        <span className="dical">Stream</span>
      </div>
      <div className="group-parent6">
        <div className="parent">
          <img className="group-child30" alt="" src="/group-1881.svg" />
          <div className="info">
            <p className="div4">(237) 681-812-255</p>
            <p className="disc">Emergency</p>
          </div>
        </div>
        <div className="everyday-parent">
          <img className="group-child31" alt="" src="/group-1771.svg" />
          <div className="info">
            <p className="everyday">09:00 - 20:00 Everyday</p>
            <p className="disc">Work Hour</p>
          </div>
        </div>
        <div className="some-place-parent">
          <img className="group-child32" alt="" src="/group-1781.svg" />
          <div className="info">
            <p className="some-place">0123 Some Place</p>
            <p className="disc">Location</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topmost;
