<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Programmer;
use App\Traits\ApiResponder;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProgrammerController extends Controller
{
    use ApiResponder;
    public function __invoke(Request $request): JsonResponse
    {
        $programmers = Programmer::paginate(10);

        return $this->success(__('Programmers'), $programmers->toArray());
        //llamada al trait ApiResponder para que nos devuelva una respuesta en formato json//
    }
}
