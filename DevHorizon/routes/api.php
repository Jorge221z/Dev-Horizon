<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProgrammerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//      url/api/login POST
Route::post("/login", [AuthController::class, "login"]);

//      url/api/signup POST
Route::post("/signup", [AuthController::class, "signup"]);

Route::group(["middleware" => "auth:sanctum"], function () { //rutas protegidas//
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get("/programmers", ProgrammerController::class);
});
