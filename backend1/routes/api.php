<?php

use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConnectedEntityController;
use App\Http\Controllers\DrugController;
use App\Http\Controllers\DrugTransactionController;
use App\Http\Controllers\ImporterOrdersController;
use App\Http\Controllers\DrugWalletController;

Route::get('/k', function () {
    return 'asdadsad';
});

Route::get('/entities', [ConnectedEntityController::class, 'index']);
Route::get('/entities/{id}', [ConnectedEntityController::class, 'show']);
Route::get('/entities/{entity}/users', [ConnectedEntityController::class, 'users_show']);


Route::get('/j', [ConnectedEntityController::class, 'index']);
Route::post('/entities', [ConnectedEntityController::class, 'store']);
Route::put('/entities/{entity}', [ConnectedEntityController::class, 'update']);
Route::delete('/entities/{entity}', [ConnectedEntityController::class, 'destroy']);

Route::get('/drug', [DrugController::class, 'index']);
Route::get('/drug-details', [DrugController::class, 'getDrugDetails']);
Route::post('/drugs', [DrugController::class, 'store']);
Route::get('/drug/{drug}', [DrugController::class, 'show']);
Route::put('/drug/{drug}', [DrugController::class, 'update']);
Route::delete('/drug/{drug}', [DrugController::class, 'destroy']);

Route::post('/register', [userController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/transaction-history', [DrugTransactionController::class, 'index']);
Route::post('/create-user', [userController::class, 'corp_store']);

Route::post('/order-history', [ImporterOrdersController::class, 'shows']);










Route::middleware(['auth:sanctum', 'role:manufacturer'])->group(function () {
    // my orders list, ordered by me
    Route::post('/manufcaturer/list-orders', [DrugController::class, 'destroy']);

    Route::post('/manufcaturer/create-order', [DrugController::class, 'destroy']);
    Route::post('/manufcaturer/cancel-order', [DrugController::class, 'destroy']);
});

Route::middleware(['auth:sanctum','role:importer'])->group(function () {
    Route::post('/importer/create-order', [ImporterOrdersController::class, 'store']);

});

Route::middleware(['auth:sanctum', 'role:distributor'])->group(function () {
    // recieved to me and i sent transactions
    Route::post('/distributor/orders-hisotry', [DrugController::class, 'destroy']);

    Route::post('/distributor/create-order', [DrugController::class, 'destroy']);
    Route::post('/distributor/cancel-order', [DrugController::class, 'destroy']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/my-entity', [UserController::class, 'myEntity']);

    Route::post('/importer/get-importer-orders', [ImporterOrdersController::class, 'show']);
    Route::post('/importer/get-importer-orderss', [ImporterOrdersController::class, 'showimportDetails']);

    Route::post('/my/drug-amount/{drugid}', [DrugWalletController::class, 'showByDrugId']);
    

});
