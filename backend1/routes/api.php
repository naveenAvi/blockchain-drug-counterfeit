<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConnectedEntityController;
use App\Http\Controllers\DrugController;

Route::get('/k', function () {
    return 'asdadsad';
});
Route::get('/j', [ConnectedEntityController::class, 'index']);
Route::post('/entities', [ConnectedEntityController::class, 'store']);
Route::get('/entities/{entity}', [ConnectedEntityController::class, 'show']);
Route::put('/entities/{entity}', [ConnectedEntityController::class, 'update']);
Route::delete('/entities/{entity}', [ConnectedEntityController::class, 'destroy']);

// Drug CRUD routes
Route::get('/drug', [DrugController::class, 'index']);
Route::post('/drugs', [DrugController::class, 'store']);
Route::get('/drug/{drug}', [DrugController::class, 'show']);
Route::put('/drug/{drug}', [DrugController::class, 'update']);
Route::delete('/drug/{drug}', [DrugController::class, 'destroy']);