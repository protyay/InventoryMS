import React, { Component } from 'react';
import './styles/app.css';
export class ContentArea extends Component {
    render() {
        return (
            <div className="w-2/3 justify-center">

                <div>
                    <h1 className="text-2xl font-medium text-green-600">Welcome User</h1>
                </div>
                <div className="mt-10">
                    <div>
                        <h1 className="text-xl font-bold text-blue-400">Customer Records</h1>
                    </div>
                    <div className="my-5">
                        <table className="border rounded">
                            <thead className="border border-blue-300">
                                <tr>
                                    <th className="font-mono text-lg text-purple-500 px-3 border-r-2">First Name</th>
                                    <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Last Name</th>
                                    <th className="font-mono text-lg text-purple-500 px-3 border-r-2">Username</th>
                                </tr>
                            </thead>
                            <tbody className="border border-gray-600">
                                <tr>
                                    
                                    <td className="text-center border-r-2">Mark</td>
                                    <td className="text-center border-r-2">Otto</td>
                                    <td className="text-center border-r-2">@mdo</td>
                                </tr>
                                <tr>
                                   
                                    <td className="text-center border-r-2">Jacob</td>
                                    <td className="text-center border-r-2">Thornton</td>
                                    <td className="text-center text-wrap border-r-2">@fat</td>
                                </tr>
                                <tr>
                                   
                                    <td className="text-center border-r-2">Larry</td>
                                    <td className="text-center border-r-2">the Bird</td>
                                    <td className="text-center border-r-2">@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        )
    }
}

export default ContentArea
