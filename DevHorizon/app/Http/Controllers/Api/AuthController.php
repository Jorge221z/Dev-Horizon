<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponder;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AuthController extends Controller
{
    use ApiResponder;

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => "required|email",
            'password' => "required|min:4|max:60",
            'device_name' => "required",
        ]);

        $user = User::select(['id', 'email', 'name', 'password'])
            ->where('email', $request->input('email'))
            ->first();

        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            throw ValidationException::withMessages(['email' => [__('Credenciales incorrectas')]]);
        }

        $token = $user->createToken($request->input('device_name'))->plainTextToken;

        return $this->success(__('Bienvenid@'), [
            'token' => $token,
            'user' => $user->toArray(),
        ]);
    }

    public function signup(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|min:2|max:60',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4|max:60',
            'password_confirmation' => 'required|same:password|min:4|max:60',
        ]);

        User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'created_at' => now(),
        ]);

        return $this->success(__('¡¡Cuenta creada!!'));
    }

    public function logout(Request $request): JsonResponse
    {
        $token = $request->bearerToken();

        /** @var PersonalAccessToken $model */
        $model = Sanctum::$personalAccessTokenModel;
        $accessToken = $model::findToken($token);

        if ($accessToken) {
            $accessToken->delete();
        }

        return $this->success(__('Hasta la próxima'), null, 200);
    }
}
