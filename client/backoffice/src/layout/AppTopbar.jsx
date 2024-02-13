import { Link } from "react-router-dom";
import { classNames } from "primereact/utils";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { LayoutContext } from "src/layout/context/layoutcontext.jsx";
import { LogOut } from "./LogOut";

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <div className="layout-topbar space-between">
      <div className="flex">
        <Link href="/" className="layout-topbar-logo">
          {/* <img src="" width="47.22px" height={'35px'} widt={'true'} alt="logo" /> */}
          <span>PICKME</span>
        </Link>

        <button
          ref={menubuttonRef}
          type="button"
          className="p-link layout-menu-button layout-topbar-button"
          onClick={onMenuToggle}
        >
          <i className="pi pi-bars" />
        </button>

        <button
          ref={topbarmenubuttonRef}
          type="button"
          className="p-link layout-topbar-menu-button layout-topbar-button"
          onClick={showProfileSidebar}
        >
          <i className="pi pi-ellipsis-v" />
        </button>
      </div>
      <LogOut />
    </div>
  );
});

export default AppTopbar;
