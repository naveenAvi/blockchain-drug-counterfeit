<?php
namespace App\Services;

use App\Models\TransactionStatusModel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LoggingService
{
    /**
     * Log in to Fabric and return the token
     */
    public function addTransactionLog($type, $stage, $passfail, $message, $eventReferenceNumber   ){
        try {
            TransactionStatusModel::create([
                'type'=> $type,
                'stage'=> $stage,
                'passfail'=> $passfail,
                'message'=> $message,
                'eventReferenceNumber'=> $eventReferenceNumber
            ]);
        } catch (\Throwable $th) {
            //throw $th;
        }
        
    }

    public function clearTransactionLogs($eventReferenceNumber){
        try {
            TransactionStatusModel::wHere(['eventReferenceNumber'=> $eventReferenceNumber])->delete();
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
