<?php
namespace App\Traits;

use Illuminate\Http\JsonResponse;

//servirá para retornar respuestas unificadas en formato json//
trait ApiResponder{

    protected function success(string $message, $data = null, int $code = 200): JsonResponse {
        return response()->json([
            "status" => "success",
            "message" => $message,
            "data" => $data,
        ], $code); //por defecto sera un 200(osea OK)
}


    protected function error(string $message, int $code = 400): JsonResponse {
        return response()->json([
            "status" => "error",
            "message" => $message,
        ], $code); //por defecto sera un 400(osea BAD REQUEST)
    }

}
