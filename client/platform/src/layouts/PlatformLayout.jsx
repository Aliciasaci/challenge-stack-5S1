import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function PlatformLayout() {
    return (
        <div className='layout-wrapper bg-gray-100'>
            <Header />
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    )
}