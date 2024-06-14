import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSlot, deleteSlot } from '../slices/slotSlices/slotSlice';
import Spinner from './Spinner';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast'

const AdminAllSlot = () => {
    const [slot, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        const handleSlot = async () => {
            setIsLoading(true)
            try {
                const res = await fetch('/api/slot/all-slot', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();

                if (data) {
                    setSlots(data);
                    dispatch(setSlot(data));
                }
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err.error);
            }finally {
                setIsLoading(false)
            }
        };
        handleSlot();
    }, [dispatch]);

    const handleDelete = async (id) => {
        setIsLoading(true)
        try {
            await fetch(`/api/slot/delete-slot/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            dispatch(deleteSlot(id));
            setSlots(slot.filter(item => item._id !== id));
            toast.success('deleted successfully')
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }finally {
            setIsLoading(false)
        }
    };

    return isLoading ? <Spinner/> :(
        <div className="flex justify-center mb-20">
            <div className='w-9/12 mt-3'>
                <div className='text-center'>
                    <h2 className="text-3xl mb-4 relative inline-block">All Slots</h2>
                    <div className="w-32 bg-orange-500 mx-auto mb-10" style={{ height: '2px' }}></div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Date</th>
                                <th className="py-3 px-6 text-left">Time</th>
                                <th className="py-3 px-6 text-left">Recording_type</th>
                                <th className="py-3 px-6 text-left">Duration</th>
                                <th className="py-3 px-6 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {slot.map((item) => (
                                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">{item.name}</td>
                                    <td className="py-3 px-6 text-left">{item.email}</td>
                                    <td className="py-3 px-6 text-left">{item.date}</td>
                                    <td className="py-3 px-6 text-left">{item.time}</td>
                                    <td className="py-3 px-6 text-left">{item.recording_type}</td>
                                    <td className="py-3 px-6 text-left">{item.session_duration}</td>
                                    <td className="py-3 px-6 text-left">
                                        <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminAllSlot;
