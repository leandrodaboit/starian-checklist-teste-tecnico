<?php

namespace App\Domain\Task\DTOs;

use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;

final class UpdateTaskData extends Data
{
    public function __construct(
        #[Required, NumericType]
        public int $id,

        #[StringType, Max(255)]
        public ?string $title = null,

        #[BooleanType]
        public ?bool $completed = false,
    ) {}

    public static function messages(): array
    {
        return [
            'task_code.required' => 'The task code is required for updates.',
            'task_code.integer'  => 'The task code must be an integer.',
            'title.string'       => 'The title must be a valid string.',
            'title.max'          => 'The title may not be greater than 255 characters.',
            'completed.boolean'  => 'The completed status must be true or false.',
        ];
    }
}
