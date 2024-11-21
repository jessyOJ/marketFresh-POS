import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ClearDataOnClose = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('pos-user');
      localStorage.removeItem('cartItem')
      dispatch({ type: 'CLEAR_USER' }); // Clear Redux store
      dispatch({ type: 'CLEAR_CART' });
    };

    // Add the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Cleanup the event listener
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return null; 
};

export default ClearDataOnClose;



