import UserInformations from "../components/userprofil/UserInformations";
import UserReservations from "../components/userprofil/UserReservations";
import CancelledReservations from "../components/userprofil/CancelledReservations";
import PastReservations from "../components/userprofil/PastReservations";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Dropdown } from 'flowbite-react';


export default function ProfilUser() {
  const [selectedTab, setSelectedTab] = useState('reservations');
  // const location = useLocation();

  // if (location.state.page) {
  //   setSelectedTab(location.state.page);
  // }else{
  //   setSelectedTab()
  // }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-3/4 mb-8">
      <div className="bg-gray-100 flex w-full justify-between">
        <div className="mt-10 mr-2 w-1/4 block p-6 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="text-xl text-gray-800">Mon compte</h5>
          <ul className="list-none mt-2">
            <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => handleTabClick('mon-compte')}>
                <svg class="w-6 h-6 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Mes informations</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => handleTabClick('reservations')}>
                <svg class="w-5 h-5 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Réservations à venir</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => handleTabClick('cancelled-reservations')}>
                <svg class="w-5 h-5 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Réservations annulée(s)</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={() => handleTabClick('past-reservations')}>
                <svg class="w-5 h-5 text-gray-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v13H7a2 2 0 0 0-2 2Zm0 0c0 1.1.9 2 2 2h12M9 3v14m7 0v4" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Réservations passées</span>
              </a>
            </li>
          </ul>
          <hr className="mt-6 mb-6"></hr>
          <p className="font-normal text-red-500">Se déconnecter</p>
        </div>
        {selectedTab === "mon-compte" && (
          <UserInformations></UserInformations>
        )}
        {selectedTab === "cancelled-reservations" && (
          <CancelledReservations></CancelledReservations>
        )}
        {selectedTab === "reservations" && (
          <UserReservations></UserReservations>
        )}
        {
          selectedTab === "past-reservations" && (
            <PastReservations></PastReservations>
          )
        }
      </div>
    </div>
  );
}
