const fullBody = {
  email: 'admin@admin.com',
  password: 'admin123',
};

const noEmail = {
  password: 'admin123',
};

const noPassword = {
  email: 'admin@admin.com',
};

const invalidEmail = {
  email: 'admin.com',
  password: 'admin123',
};

const invalidPassword = {
  email: 'admin@admin.com',
  password: 'test'
};

const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$12$Y5poB8FPOsUPv5EwcW7kdO3YEuJFP.YMq8DTIEFIVmaI3ttuPLSTu',
}

const response = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
}

const INVALID_ERROR = 'Incorrect email or password';

const FIELD_ERROR = 'All fields must be filled';

export {
  fullBody,
  noEmail,
  noPassword,
  invalidEmail,
  invalidPassword,
  userMock,
  response,
  INVALID_ERROR,
  FIELD_ERROR,
};
