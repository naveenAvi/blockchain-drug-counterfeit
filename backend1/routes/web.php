<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ConnectedEntityController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/dd', function () {
    return view('welcome');
});
Route::get('/entities', [ConnectedEntityController::class, 'index']);