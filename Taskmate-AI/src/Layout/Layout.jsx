import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../Feature/auth/authSlice';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import About from '../Pages/About';

const Layout = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modal.activeModal);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Outlet />
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-purple-700 p-8 rounded-lg max-w-md w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            {activeModal === 'login' && <Login onClose={handleCloseModal} />}
            {activeModal === 'signup' && <Signup onClose={handleCloseModal} />}
            {activeModal === 'about' && <About onClose={handleCloseModal} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;