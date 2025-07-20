<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FabricAuthService
{
    protected $baseUrl = 'http://20.193.133.149:3000/api';

    /**
     * Log in to Fabric and return the token
     */
    public function login($username, $role = 'manufacturer', $org = 'Org1', $password = '12345')
    {
        try {
            $response = Http::post("{$this->baseUrl}/login", [
                'username' => $username,
                'org'      => $org,
                'role'     => $role,
                'password' => $password,
            ]);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'token' => $response['token'],
                    'user' => $response['user'],
                ];
            } else {
                Log::error('Fabric login failed: ' . $response->body());
                return [
                    'success' => false,
                    'message' => 'Login failed',
                    'error' => $response->body(),
                ];
            }
        } catch (\Exception $e) {
            Log::error('Exception during Fabric login: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Exception during Fabric login',
                'error' => $e->getMessage(),
            ];
        }
    }
}
