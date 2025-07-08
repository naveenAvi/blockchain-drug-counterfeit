<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Mail\CorpUserWelcomeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Str;

class userController extends Controller
{
    public function corp_store(Request $request)
    {
        $validated = $request->validate([
            'firstname'     => 'required|string|max:255',
            'lastname'      => 'required|string|max:255',
            'email'         => 'required|email|unique:users,email',
            'designation'   => 'nullable|string|max:255',
            'entID'         => 'required|exists:connectedEntities,entID',
        ]);

        $plainPassword = Str::random(10);

        $user = User::create([
            'name'     => $validated['firstname'] . ' ' . $validated['lastname'],
            'email'         => $validated['email'],
            'designation'   => $validated['designation'] ?? '',
            'entID'         => $validated['entID'],
            // 'password'      => Hash::make($plainPassword),
            'password'      => Hash::make('1234'),
        ]);

        //Mail::to($user->email)->send(new CorpUserWelcomeMail($user, $plainPassword));

        return response()->json([
            'success' => true,
            'message' => 'User created and credentials sent via email.',
            'data' => $user
        ]);
    }
   
}
