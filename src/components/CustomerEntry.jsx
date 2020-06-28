
import React from 'react';

export default function Customerentry() {
    return (

        <form>
            <div class="container" style="margin-top:10px">
                <table style="width:50%">
                    <tr>
                        <td><input type="text" class="form-control" required="required" style="width :350px" placeholder="Enter Customer Name or Contact Person" /></td>
                        <td><button class="btn btn-info">Search</button></td>
                    </tr>
                </table>


                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-8"><h2>Customer <b>Records</b></h2></div>
                            <div class="col-sm-4">
                                <a class="btn btn-info" href="customerEntry.html"><i class="fa fa-plus"></i>Add New Customer</a>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-bordered" style="width:100%" id="example">
                        <thead>
                            <tr>
                                <th>Customer Code</th>
                                <th>Customer Name</th>
                                <th>Contact Person</th>
                                <th>Contact No.</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>Chandra Enterprise</td>
                                <td>Saumya Chandra</td>
                                <td>0854751513</td>
                                <td>Yes</td>
                                <td>
                                    <a class="edit" title="Edit"><i class="material-icons">&#xE254;</i></a>
                                    <a href="#" data-toggle="modal" data-target="#myModal">Visit Details</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>


                <div class="modal" id="myModal">
                    <div class="modal-dialog">
                        <div class="modal-content">


                            <div class="modal-header">
                                <h4 class="modal-title">Latest Visit Details</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>


                            <div class="modal-body">
                                <p>Visit Date <input type="text" /></p>
                                <p>Visited By <input type="text" /></p>
                                <p>Visit Cost <input type="text" /></p>
                            </div>


                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" >Save</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </form>





    );
}

