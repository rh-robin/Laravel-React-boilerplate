<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(6);

        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title).'-'.fake()->unique()->randomNumber(4),
            'summary' => fake()->paragraph(2),
            'content' => fake()->paragraphs(5, true),
            'cover_image' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
            'tags' => implode(',', fake()->words(3)),
            'read_time' => fake()->numberBetween(2, 12),
            'is_featured' => fake()->boolean(25),
            'status' => fake()->randomElement(['published', 'draft']),
            'published_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
