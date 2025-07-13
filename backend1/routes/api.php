<?php

use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConnectedEntityController;
use App\Http\Controllers\DrugController;

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


Route::middleware(['auth:sanctum', 'role:manufacturer'])->group(function () {
    // my orders list, ordered by me
    Route::delete('/manufcaturer/list-orders', [DrugController::class, 'destroy']);

    Route::delete('/manufcaturer/create-order', [DrugController::class, 'destroy']);
    Route::delete('/manufcaturer/cancel-order', [DrugController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:distributor'])->group(function () {
    // recieved to me and i sent transactions
    Route::delete('/distributor/orders-hisotry', [DrugController::class, 'destroy']);

    Route::delete('/distributor/create-order', [DrugController::class, 'destroy']);
    Route::delete('/distributor/cancel-order', [DrugController::class, 'destroy']);
});