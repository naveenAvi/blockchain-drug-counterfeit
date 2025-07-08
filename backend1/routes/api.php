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