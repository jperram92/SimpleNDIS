module.exports = {
  default: jest.fn(() => ({
    id: 'credentials',
    name: 'credentials',
    type: 'credentials',
    authorize: jest.fn(),
  })),
};