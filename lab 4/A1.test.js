const { UserService } = require('./labAssignment-lab4');

describe('UserService', () => {
  let mockGetFullName;
  let userService;
  const expectedFirstName = 'John';
  const expectedLastName = 'Doe';
  const expectedGreeting = 'HELLO, JOHN DOE!';

  beforeEach(() => {
    mockGetFullName = jest.fn((firstName, lastName) => `${firstName} ${lastName}`);
    userService = new UserService(mockGetFullName);
  });

  it('Метод `greet()` викликає передану залежну функцію `getFullName` з аргументами `"John"` та `"Doe"', () => {
    userService.greet();
    expect(mockGetFullName).toHaveBeenCalledWith(expectedFirstName, expectedLastName);
  });

  it('- Метод повертає рядок у форматі `HELLO, <повне імя>!` (усі символи – у верхньому регістрі', () => {
    const greetingResult = userService.greet();
    expect(greetingResult).toBe(expectedGreeting);
  });
});