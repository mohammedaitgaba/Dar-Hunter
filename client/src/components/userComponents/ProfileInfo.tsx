import React from 'react'

const ProfileInfo = () => {
  return (
    <div className="w-full md:w-3/12 md:mx-2">
    <div className="bg-white p-3 shadow-md rounded-xl">
        <div className="image overflow-hidden">
            <img className="h-2/5 w-2/5 mx-auto rounded-[50%]"
                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                alt=""/>
        </div>
        <div className='text-center py-4'>
            <h1 className="text-gray-900 font-bold self-center text-xl leading-8 my-1">Jane Doe</h1>
        </div>
        <hr />
        <div className='flex flex-col justify-around text-gray-500'>
            <div className='p-2'>
                <p className='text-xs'>Email</p>
                <p>medgaba@gmail.com</p>
            </div>
            <div className='p-2'>
                <p className='text-sm'>Phone</p>
                <p>0656514243</p>
            </div>
            <div className='p-2'>
                <p className='text-sm'>Birthday</p>
                <p>12/12/2000</p>
            </div>
            <div>
                <ul
                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                        <span>Status</span>
                        <span className="ml-auto"><span
                                className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                    </li>
                    <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">Nov 07, 2016</span>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</div>  
)
}
export default ProfileInfo