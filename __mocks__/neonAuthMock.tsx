import { jest } from '@jest/globals';

export const createAuthClient = jest.fn(() => ({}));

export const UserProfile = () => <div>Mocked User Profile</div>;
export const LogoutButton = () => <button>Mocked Logout</button>;
export const UserButton = () => <div>User Button</div>

export const SignOutButton = () => "Mocked Sign Out";