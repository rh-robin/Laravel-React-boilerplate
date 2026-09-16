<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Primary Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Admin User',
                'username' => 'admin',
                'password' => Hash::make('password'),
                'user_type' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 2. Create Secondary Admin
        $supervisorAdmin = User::firstOrCreate(
            ['email' => 'supervisor@example.com'],
            [
                'name' => 'Supervisor User',
                'username' => 'supervisor',
                'password' => Hash::make('password'),
                'user_type' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // 3. Create regular dummy users
        $regularUsers = [
            ['name' => 'RH Robin', 'username' => 'rhrobin', 'email' => 'rhrobin8880@gmail.com'],
            ['name' => 'Standard User', 'username' => 'user', 'email' => 'user@example.com'],
            ['name' => 'Lolita Dickens', 'username' => 'nienow.kailee', 'email' => 'anne.purdy@example.org'],
            ['name' => 'Francesca Rau', 'username' => 'khansen', 'email' => 'nsipes@example.org'],
            ['name' => 'Kristofer Dooley', 'username' => 'dudley.jones', 'email' => 'lparker@example.com'],
            ['name' => 'Brandt Pfannerstill', 'username' => 'jerad.heaney', 'email' => 'joy39@example.net'],
            ['name' => 'America Langworth', 'username' => 'langworth.a', 'email' => 'america@example.org'],
            ['name' => 'Devon Runolfsdottir', 'username' => 'devon.r', 'email' => 'devon@example.com'],
            ['name' => 'Gavin Morar', 'username' => 'gavin.m', 'email' => 'gavin@example.net'],
            ['name' => 'Elenor Stehr', 'username' => 'elenor.s', 'email' => 'elenor@example.org'],
        ];

        foreach ($regularUsers as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'username' => $userData['username'],
                    'password' => Hash::make('password'),
                    'user_type' => 'user',
                    'is_active' => true,
                    'email_verified_at' => now(),
                ]
            );
        }

        // Create 2 soft-deleted users for the Trash demonstration
        $trashedUser = User::firstOrCreate(
            ['email' => 'archived.user@example.com'],
            [
                'name' => 'Archived Member',
                'username' => 'archived.member',
                'password' => Hash::make('password'),
                'user_type' => 'user',
                'is_active' => false,
                'email_verified_at' => now(),
            ]
        );
        $trashedUser->delete();

        // 4. Categories
        $categoriesData = [
            ['name' => 'Engineering', 'slug' => 'engineering', 'color' => '#3b82f6', 'description' => 'Software engineering, architecture, and infrastructure.'],
            ['name' => 'Design & UI', 'slug' => 'design-ui', 'color' => '#8b5cf6', 'description' => 'Modern interfaces, design systems, and UX.'],
            ['name' => 'Artificial Intelligence', 'slug' => 'artificial-intelligence', 'color' => '#10b981', 'description' => 'Generative AI, machine learning, and LLM integrations.'],
            ['name' => 'Cloud & DevOps', 'slug' => 'cloud-devops', 'color' => '#06b6d4', 'description' => 'Docker, Kubernetes, CI/CD pipelines, and scalability.'],
            ['name' => 'Cybersecurity', 'slug' => 'cybersecurity', 'color' => '#f59e0b', 'description' => 'Data protection, secure authentication, and audits.'],
        ];

        $categories = [];
        foreach ($categoriesData as $c) {
            $categories[] = Category::firstOrCreate(['slug' => $c['slug']], $c);
        }

        // 5. Sample Blog Posts
        $postsData = [
            [
                'title' => 'Mastering Modern Full-Stack Development with Laravel and React Inertia',
                'category_id' => $categories[0]->id,
                'read_time' => 6,
                'is_featured' => true,
                'status' => 'published',
                'cover_image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                'tags' => 'laravel,react,inertia',
                'summary' => 'A comprehensive guide on coupling modern reactive frontends seamlessly with Laravel backends without writing GraphQL or REST boilerplates.',
                'content' => 'Inertia bridges the gap between classic server-side rendered frameworks and modern single-page applications...',
            ],
            [
                'title' => 'Building Polished Dark and Light UI Systems with Tailwind CSS',
                'category_id' => $categories[1]->id,
                'read_time' => 4,
                'is_featured' => true,
                'status' => 'published',
                'cover_image' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                'tags' => 'design,tailwind,darkmode',
                'summary' => 'How to design cohesive token-driven interfaces that transition smoothly between dark and light themes.',
                'content' => 'When crafting user interfaces that demand hours of focus, dark mode is no longer an optional gimmick...',
            ],
            [
                'title' => 'Next Generation Agentic AI Workflows for Modern Development Teams',
                'category_id' => $categories[2]->id,
                'read_time' => 8,
                'is_featured' => false,
                'status' => 'published',
                'cover_image' => 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
                'tags' => 'ai,automation,agents',
                'summary' => 'Exploring how autonomous coding agents are elevating team output and transforming traditional sprint cycles.',
                'content' => 'Autonomous development assistants have matured from snippet generators to full-fledged pair programmers...',
            ],
            [
                'title' => 'Scalable Microservices vs Robust Monoliths in 2026',
                'category_id' => $categories[3]->id,
                'read_time' => 5,
                'is_featured' => false,
                'status' => 'draft',
                'cover_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
                'tags' => 'architecture,cloud,devops',
                'summary' => 'A pragmatic look at why high-velocity teams are returning to modular monoliths with smart boundaries.',
                'content' => 'Microservice sprawl has taught the industry valuable lessons about network latency, observability, and cost...',
            ],
            [
                'title' => 'Zero-Trust Authentication Architectures for Enterprise Web Apps',
                'category_id' => $categories[4]->id,
                'read_time' => 7,
                'is_featured' => true,
                'status' => 'published',
                'cover_image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
                'tags' => 'security,auth,enterprise',
                'summary' => 'Defending modern web surfaces against session hijacking, credential stuffing, and unauthorized escalations.',
                'content' => 'Authentication is only the front door. Continuous authorization and context-aware session checks are essential...',
            ],
            [
                'title' => 'High-Throughput Database Indexing and Optimization Strategies',
                'category_id' => $categories[0]->id,
                'read_time' => 9,
                'is_featured' => false,
                'status' => 'draft',
                'cover_image' => 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
                'tags' => 'database,sql,performance',
                'summary' => 'Optimizing queries, indexing strategies, and connection pooling for applications experiencing rapid traffic surges.',
                'content' => 'Before throwing more CPU and memory at a sluggish relational database, analyze the execution plans...',
            ],
        ];

        foreach ($postsData as $post) {
            Post::firstOrCreate(
                ['title' => $post['title']],
                array_merge($post, [
                    'slug' => Str::slug($post['title']),
                    'user_id' => $admin->id,
                    'published_at' => $post['status'] === 'published' ? now()->subDays(rand(1, 15)) : null,
                ])
            );
        }
    }
}
