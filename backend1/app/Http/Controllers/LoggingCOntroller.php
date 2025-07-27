<?php

namespace App\Http\Controllers;

use App\Models\TransactionStatusModel;
use Illuminate\Http\Request;

class LoggingCOntroller extends Controller
{
    public function getTransactionLogs(Request $request){
        $eventReferenceNumber = $request->eventReferenceNumber;
        $TransactionStatusModel =  TransactionStatusModel::where("eventReferenceNumber",$eventReferenceNumber)->get();

        return response()->json($TransactionStatusModel);
    }
}
