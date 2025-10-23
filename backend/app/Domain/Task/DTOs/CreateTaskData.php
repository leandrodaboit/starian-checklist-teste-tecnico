<?php

namespace App\Domain\Task\DTOs;

use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

final class CreateTaskData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public string $title,

        #[BooleanType]
        public bool $completed = false,
    ) {}

    public static function messages(): array
    {
        return [
            'title.required' => 'The task title is required.',
            'title.string'   => 'The title must be a valid string.',
            'title.max'      => 'The title may not be greater than 255 characters.',
            'completed.boolean' => 'The completed status must be true or false.',
        ];
    }
}
