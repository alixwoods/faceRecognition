import React from "react";

function PNotify({ title, text, icon, closeToast }) {
  return (
    <>
      <div className="ui-pnotify-closer" onClick={closeToast}>
        <span className="fas fa-times" title="close"></span>
      </div>

      <h4
        style={{ direction: "rtl", textAlign: "right" }}
        className="ui-pnotify-title"
      >
        {title}
      </h4>
      {icon && (
        <div className="ui-pnotify-icon">
          <span className={icon}></span>
        </div>
      )}
      <div
        style={{ direction: "rtl", textAlign: "right", fontSize: "16px" }}
        className="ui-pnotify-text"
      >
        {text}
      </div>
    </>
  );
}

export default React.memo(PNotify);
