import request from 'supertest';
import app from '../../app';
import authService from '../../services/auth-service';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Mock the dependencies
jest.mock('../../services/auth-service');
jest.mock('rate-limiter-flexible');

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    const loginPayload = {
      email: 'test@example.com',
      password: 'password123'
    };

    it('should successfully login with valid credentials', async () => {
      const mockResponse = {
        user: { id: '1', email: 'test@example.com', role: 'employee' },
        tokens: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token'
        }
      };

      (authService.login as jest.Mock).mockResolvedValue(mockResponse);
      (RateLimiterMemory.prototype.consume as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post('/auth/login')
        .send(loginPayload);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user).toHaveProperty('email', loginPayload.email);
    });

    it('should handle rate limiting', async () => {
      (RateLimiterMemory.prototype.consume as jest.Mock).mockRejectedValue(new Error('Too many requests'));

      const response = await request(app)
        .post('/auth/login')
        .send(loginPayload);

      expect(response.status).toBe(429);
      expect(response.body).toHaveProperty('message', 'Too many requests');
    });

    it('should handle invalid credentials', async () => {
      (authService.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));
      (RateLimiterMemory.prototype.consume as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post('/auth/login')
        .send(loginPayload);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });

  describe('POST /auth/register', () => {
    const registerPayload = {
      email: 'newuser@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
      role: 'employee'
    };

    it('should successfully register a new user', async () => {
      const mockUser = {
        id: '1',
        ...registerPayload,
        password_hash: 'hashed_password'
      };

      (authService.hashPassword as jest.Mock).mockResolvedValue('hashed_password');
      (authService.generateTokens as jest.Mock).mockReturnValue({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      });

      const response = await request(app)
        .post('/auth/register')
        .send(registerPayload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user).toHaveProperty('email', registerPayload.email);
    });
  });

  describe('POST /auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const mockTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token'
      };

      (authService.refreshAccessToken as jest.Mock).mockResolvedValue(mockTokens);

      const response = await request(app)
        .post('/auth/refresh')
        .set('Cookie', ['refreshToken=valid-refresh-token']);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken', mockTokens.accessToken);
    });

    it('should handle missing refresh token', async () => {
      const response = await request(app)
        .post('/auth/refresh');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Refresh token required');
    });
  });

  describe('POST /auth/logout', () => {
    it('should successfully logout user', async () => {
      const response = await request(app)
        .post('/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Logged out successfully');
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });
});