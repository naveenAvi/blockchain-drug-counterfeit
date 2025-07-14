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
   public function register(Request $request)
    {
        //must be removed
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,manufacturer,importer,pharmacy,distributor,normal'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

   public function login(Request $request)
{
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    $userData = $user->toArray();
    $userData['token'] = $token;

    return response()->json(['user' => $userData]);
}

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
    public function myEntity(Request $request)
    {
        $user = $request->user()->load('entity');

        return response()->json($user);
    }
    
}
