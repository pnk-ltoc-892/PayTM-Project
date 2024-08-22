import React from 'react'

export default function Appbar() {
    return (
        <div className='shadow h-14 flex justify-between px-4' >
            <div className='flex flex-col justify-center h-8 p-2 ml-4 bg-blue-800 text-white rounded-xl m-1 mt-3' >
                PayTM App
            </div>
            <div className='flex' >
                <div className='flex flex-col justify-center h-full mr-4' >
                    Hello, Pankaj Singh
                </div>
                <div className='rounded-full h-12 w-12 bg-slate-500 flex justify-center mt-1 mr-2' >
                    <div className='flex flex-col justify-center h-full text-xl' >
                        P
                    </div>
                </div>
            </div>
        </div>
    )
}
