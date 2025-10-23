<?php

namespace App\Support\Traits;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as Http;

trait ApiResponses
{
    protected function dataResponse(
        mixed $data,
        string $message = 'Success.',
        int $statusCode = Http::HTTP_OK
    ): JsonResponse {
        return response()->json([
            'message' => $message,
            'data'    => $data,
        ], $statusCode);
    }

    protected function messageOnlyResponse(
        string $message,
        int $statusCode = Http::HTTP_OK
    ): JsonResponse {
        return response()->json([
            'message' => $message,
        ], $statusCode);
    }
}
