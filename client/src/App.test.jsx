import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = vi.fn((url) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          url.endsWith('/employees')
            ? [{ id: 1, name: 'Ann', department: 'Engineering', address: 'Pune' }]
            : [{ id: 1, name: 'Engineering', description: '' }]
        ),
    })
  );
});

test('renders the forms and the employees loaded from the API', async () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /add department/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /add employee/i })).toBeInTheDocument();
  expect(await screen.findByText('Ann')).toBeInTheDocument();
});
