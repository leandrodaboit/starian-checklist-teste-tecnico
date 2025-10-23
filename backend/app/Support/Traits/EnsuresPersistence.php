<?php

namespace App\Support\Traits;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpKernel\Exception\HttpException;

trait EnsuresPersistence
{
    protected function ensurePersisted(Model $model, string $message): Model
    {
        throw_unless($model->exists, new HttpException(500, $message));
        return $model->refresh();
    }
}
