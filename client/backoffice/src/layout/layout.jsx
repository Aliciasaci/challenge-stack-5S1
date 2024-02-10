import { useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEventListener, useUnmountEffect } from 'primereact/hooks';
import { classNames, DomHandler } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';
import PrimeReact from 'primereact/api';
import AppSidebar from './AppSidebar';
import AppTopbar from './AppTopbar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { Routes, Route } from 'react-router-dom';
import CrudUser from '../pages/admin/CrudUser';
import CrudCategory from '../pages/admin/CrudCategory';
import AdminEtablissement from '../pages/admin/AdminEtablissement';
import DemandePrestataire from '../pages/admin/DemandePrestataire';
import CrudEmploye from '../pages/prestataire/CrudEmploye';
import CrudPrestation from '../pages/prestataire/CrudPrestation';
import CrudEtablissement from '../pages/prestataire/CrudEtablissement';

const Layout = (props) => {
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);

    const router = useNavigate();
    const location = useLocation();

    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(sidebarRef.current.isSameNode(event.target) || sidebarRef.current.contains(event.target) || topbarRef.current.menubutton.isSameNode(event.target) || topbarRef.current.menubutton.contains(event.target));

            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });

    const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current.topbarmenu.isSameNode(event.target) ||
                topbarRef.current.topbarmenu.contains(event.target) ||
                topbarRef.current.topbarmenubutton.isSameNode(event.target) ||
                topbarRef.current.topbarmenubutton.contains(event.target)
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        }
    });

    const hideMenu = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState) => ({ ...prevLayoutState, profileSidebarVisible: false }));
        unbindProfileMenuOutsideClickListener();
    };

    const blockBodyScroll = () => {
        DomHandler.addClass('blocked-scroll');
    };

    const unblockBodyScroll = () => {
        DomHandler.removeClass('blocked-scroll');
    };

    useEffect(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);

    useEffect(() => {
        const handleRouteChange = () => {
            hideMenu();
            hideProfileMenu();
        };

        // Subscribe to route changes using location
        const unsubscribe = () => router(handleRouteChange);

        // Cleanup logic
        return () => {
            unsubscribe();
            unbindMenuOutsideClickListener();
            unbindProfileMenuOutsideClickListener();
        };
    }, [router, hideMenu, hideProfileMenu, bindMenuOutsideClickListener, bindProfileMenuOutsideClickListener]);

    PrimeReact.ripple = true;

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

    const containerClass = classNames('layout-wrapper', {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple
    });

    return (
        <>
            <div className={containerClass}>
                <AppTopbar ref={topbarRef} />
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppSidebar />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main">
                        <Routes>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/users" element={<CrudUser />} />
                            <Route path="/admin/categories" element={<CrudCategory />} />
                            <Route path="/admin/etablissements" element={<AdminEtablissement />} />
                            <Route path="/admin/demandes" element={<DemandePrestataire />} />

                            <Route path="/prestataire/employes" element={<CrudEmploye />} />
                            <Route path="/prestataire/prestations" element={<CrudPrestation />} />
                            <Route path="/prestataire/etablissements" element={<CrudEtablissement />} />
                        </Routes>
                    </div>
                </div>
                <div className="layout-mask"></div>
            </div>
        </>
    );
};

export default Layout;
