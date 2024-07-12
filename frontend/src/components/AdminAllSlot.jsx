import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSlot } from '../slices/slotSlices/slotSlice';
import { useGetAllSlotQuery, useDeleteSlotMutation } from '../slices/slotSlices/slotApiSlice';
import Spinner from './Spinner';
import toast from 'react-hot-toast'

const AdminAllSlot = () => {
    const dispatch = useDispatch();
    const {data: slot, isLoading, error, refetch} = useGetAllSlotQuery()
    const [deleteSlot] = useDeleteSlotMutation()

    useEffect(() => {
        if(slot) {
            refetch()
            dispatch(setSlot(slot))
        }
    }, [dispatch, slot]);

    const handleDelete = async (id) => {
        try {
            await deleteSlot(id)
            refetch()
            toast.success('deleted successfully')
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };
    if (error) {
        return (
          <div className="max-w-md mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Occurred</h3>
                <div className="mt-2 text-sm text-red-700">
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(error, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );
      }
    

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
                            {slot && slot.map((item) => (
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
