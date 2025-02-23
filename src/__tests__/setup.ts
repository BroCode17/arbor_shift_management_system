beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...process.env,
    JWT_ACCESS_SECRET: 'test-access-secret',
    JWT_REFRESH_SECRET: 'test-refresh-secret',
  };
});

afterEach(() => {
  jest.clearAllMocks();
});