<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_root_route_renders_welcome_page(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_admin_login_page_renders(): void
    {
        $response = $this->get('/admin/login');

        $response->assertStatus(200);
    }

    public function test_unauthenticated_user_redirected_to_admin_login(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/admin/login');
    }

    public function test_regular_user_cannot_access_admin_dashboard(): void
    {
        $user = User::factory()->create([
            'user_type' => 'user',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin');

        $response->assertRedirect('/admin/login');
    }

    public function test_admin_can_login_and_access_dashboard(): void
    {
        $admin = User::factory()->admin()->create([
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'is_active' => true,
        ]);

        $loginResponse = $this->post('/admin/login', [
            'email' => 'admin@admin.com',
            'password' => 'password',
        ]);

        $loginResponse->assertRedirect('/admin');
        $this->assertAuthenticatedAs($admin);

        $dashboardResponse = $this->actingAs($admin)->get('/admin');
        $dashboardResponse->assertStatus(200);
    }

    public function test_admin_can_view_users_and_posts_pages(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)->get('/admin/posts')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/users')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/categories')->assertStatus(200);
        $this->actingAs($admin)->get('/admin/settings')->assertStatus(200);
    }

    public function test_admin_can_toggle_user_status(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create(['is_active' => true]);

        $response = $this->actingAs($admin)->patch("/admin/users/{$user->id}/toggle-status");

        $response->assertSessionHas('success');
        $this->assertFalse($user->fresh()->is_active);
    }

    public function test_admin_can_soft_delete_and_restore_user(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->create();

        // Soft delete
        $this->actingAs($admin)->delete("/admin/users/{$user->id}");
        $this->assertSoftDeleted('users', ['id' => $user->id]);

        // Restore
        $this->actingAs($admin)->post("/admin/users/{$user->id}/restore");
        $this->assertNotSoftDeleted('users', ['id' => $user->id]);
    }
}
